import React from 'react'

import * as yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupLocale } from '../../../utilities/misc';

import {
    FormControlLabel,
    Grid,
    Switch,
    TextField,
    Typography,
    CircularProgress,
    Backdrop,
    makeStyles,
    createStyles
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { usePFaddAddressMutation, usePFupdateAddressMutation, usePFremoveAddressesMutation } from '../../../graphql/generated';

import { useSnackbar } from 'notistack';

import Cleave from 'cleave.js/react';

import countryCodes from '../../../utilities/countryCodes';

import axios from 'axios';


const validationSchema = yup.object().shape({
    isMain: yup.boolean().required(yupLocale.required),
    name: yup.string().max(40, yupLocale.string.messages.max).required(yupLocale.required),
    CEP: yup.string().length(9, yupLocale.string.messages.length).matches(/^\d{5}-\d{3}$/, yupLocale.string.messages.CEP).required(yupLocale.required),
    country: yup.string().length(2, yupLocale.string.messages.length).uppercase(yupLocale.string.messages.uppercase).required(yupLocale.required),
    state: yup.string().length(2, yupLocale.string.messages.length).uppercase(yupLocale.string.messages.uppercase).required(yupLocale.required),
    city: yup.string().max(40, yupLocale.string.messages.max).required(yupLocale.required),
    district: yup.string().max(40, yupLocale.string.messages.max),
    street: yup.string().max(265, yupLocale.string.messages.max).required(yupLocale.required),
    number: yup.string().max(8, yupLocale.string.messages.max).required(yupLocale.required),
    complement: yup.string().max(40, yupLocale.string.messages.max),
});

const useStyles = makeStyles(
    theme => createStyles({
        root: {
            width: '100%',
            padding: theme.spacing(2)
        },
        option: {
            fontSize: 15,
            '& > span': {
                marginRight: 10,
                fontSize: 18,
            },
        },
        button: {
            color: theme.palette.common.white,
            margin: theme.spacing(1)
        },
        actionRow: {
            padding: theme.spacing(2)
        }
    })
);

const CleaveTextField = ({ inputRef, options, ...otherProps }: any) => (
    <Cleave {...otherProps} htmlRef={inputRef} options={options} />
);

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode: string) {
    return typeof String.fromCodePoint !== 'undefined' ?
        isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397)) :
        isoCode;
}

// FIX THIS
function CountrySelect({ defaultValue, error, helperText, inputRef }:
    { defaultValue?: string, error: boolean, helperText?: string, inputRef: any }) {
    const classes = useStyles();

    return (
        <Autocomplete
            options={countryCodes.map(value => value.code) as string[]}
            defaultValue={defaultValue}
            classes={{
                option: classes.option,
            }}
            autoHighlight
            renderOption={(option) => (
                <React.Fragment>
                    <span>{countryToFlag(option)}</span>
                    {option}
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField variant="outlined"
                    {...params}
                    name="country"
                    label="Pais"
                    error={error}
                    helperText={helperText}
                    inputRef={inputRef}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // Disable AutoComplete and AutoFill
                        maxLength: 2
                    }}
                />
            )}
        />
    );
}

export interface AddressFormProps {
    initialData?: any;
    defaultName?: string;
    hasMain?: boolean;
    PFCustomerID: string;
}

export const AddressForm: React.FC<AddressFormProps> = ({ initialData, defaultName, hasMain, PFCustomerID }) => {

    const [loading, setLoading] = React.useState(false)

    // Hooks
    const { register, handleSubmit, errors, control, setValue } = useForm({ resolver: yupResolver(validationSchema) });
    const { enqueueSnackbar } = useSnackbar();
    
    const [addAddress] = usePFaddAddressMutation();
    const [updateAddress] = usePFupdateAddressMutation();
    const [removeAddresses] = usePFremoveAddressesMutation();


    // Methods
    const autocompleteByCEP = async (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLoading(true);
        let CEP = event.target.value.replace('-', '');
        if (CEP.length !== 8){
            setLoading(false)
            return;
        };
        try {
            let response = await axios.get(`https://viacep.com.br/ws/${CEP}/json/`);
            if (!(response.status === 200 || response.statusText === "OK")) {
                setLoading(false)
                return;
            }
            let {
                bairro: district,
                complemento: complement,
                localidade: city,
                logradouro: street,
                uf: state
            } = response.data

            if (district) setValue('district', district);
            if (complement) setValue('complement', complement);
            if (city) setValue('city', city)
            if (street) setValue('street', street);
            if (state) setValue('state', state)

            setLoading(false);
            return;

        } catch (err) {
            setLoading(false)
            return;
        }
        
    }

    const handleAddUpdate = async (data: any) => {
        try {
            setLoading(true)
            if (initialData) {
                let updateResponse = await updateAddress({variables: {
                    PFAddressID: initialData.id,
                    ...data
                }});
                
                if (updateResponse.data) enqueueSnackbar("Endereço Alterado com Sucesso !", {variant: "success"});

            } else {
                let addResponse = await addAddress({variables: {
                    PFCustomerID: PFCustomerID,
                    ...data
                }});
                
                if (addResponse.data) enqueueSnackbar("Novo Endereço Adicionado com Sucesso !", {variant: "success"});
            }
        } catch (err) {
            console.error(err);

            if (initialData) {
                enqueueSnackbar(
                    <><Typography>Erro ao Alterar Endereço. Tente Novamente em Alguns Minutos.</Typography>
                    <br/>
                    <Typography>{err.message}</Typography></>,
                    {variant: "error"}
                )
            } else {
                enqueueSnackbar("Erro ao Adicionar Endereços. Tente Novamente em Alguns Minutos.", {variant: "error"})
            }
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = async () => {
        try {
            setLoading(true)
            
                let removeResponse = await removeAddresses({variables: {
                    PFAddressIDS: [initialData.id],
                }});
                
                if (removeResponse.data) enqueueSnackbar("Endereço Removido com Sucesso !", {variant: "success"});

        } catch (err) {
            console.error(err);
            enqueueSnackbar("Erro ao Remover Endereço. Tente Novamente em Alguns Minutos.", {variant: "error"})
            
        } finally {
            setLoading(false)
        }
    }

    // CSS
    const classes = useStyles();

    return (
        <form id="PFAddress" className={classes.root} onSubmit={handleSubmit((data) => handleAddUpdate(data))} autoComplete="false">
            <Grid container direction='column' spacing={3}>
                
                <Grid item container direction='row-reverse'>
                    <Grid item>
                        <Controller
                            name="isMain"
                            control={control}
                            defaultValue={(initialData && initialData.isMain) ? initialData.isMain : false}
                            render={props =>
                                <FormControlLabel label="Principal" labelPlacement='start'
                                    disabled={(hasMain && (!initialData || !initialData.isMain)) }
                                    control={
                                        <Switch color="primary" checked={props.value} size='small'
                                            onChange={e => props.onChange(e.target.checked)} />
                                    }
                                />
                            }
                        />
                    </Grid>
                </Grid>

                <Grid item container direction='row' spacing={3}>
                    <Grid item lg={6}>
                    <Controller 
                        defaultValue={(initialData && initialData.name) ? initialData.name : defaultName ? defaultName : ""}
                        name='name'
                        control={control}
                        label="Nome"
                        as={
                            <TextField fullWidth variant="outlined"
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                                inputProps={{
                                    maxLength: 40
                                }}/>
                            }/>
                        
                    </Grid>
                    <Grid item lg={6}>
                        <Controller
                            name="CEP"
                            control={control}
                            defaultValue={(initialData && initialData.CEP) ? initialData.CEP : ""}
                            render={props => (
                                <TextField fullWidth variant="outlined"
                                    {...props}
                                    label="CEP"
                                    error={!!errors.CEP}
                                    helperText={
                                        errors.CEP ? errors.CEP.message : ""
                                    }
                                    onBlur={autocompleteByCEP}
                                    inputProps={{
                                        options: {
                                            delimiters: ["-"],
                                            blocks: [5, 3],
                                            numericOnly: true
                                        }
                                    }}
                                    InputProps={{
                                        inputComponent: CleaveTextField
                                    }}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Grid item container direction='row' spacing={3}>
                    
                    <Grid item lg={7}>
                        <Controller 
                            defaultValue={(initialData && initialData.street) ? initialData.street : ""}
                            name='street'
                            control={control}
                            label="Rua"
                            as={
                                <TextField fullWidth variant="outlined"
                                    error={!!errors.street}
                                    helperText={errors.street ? errors.street.message : ''}/>
                                }/>
                    </Grid>
                    <Grid item lg={2}>
                        <Controller 
                            defaultValue={(initialData && initialData.number) ? initialData.number : ""}
                            name='number'
                            control={control}
                            label="Número"
                            as={
                                <TextField fullWidth variant="outlined"
                                    error={!!errors.number}
                                    helperText={errors.number ? errors.number.message : ''}
                                    inputProps={{
                                        maxLength: 8
                                    }}/>
                                }/>
                    </Grid>
                    <Grid item lg={3}>
                        <Controller 
                            defaultValue={(initialData && initialData.complement) ? initialData.complement : ""}
                            name='complement'
                            control={control}
                            label="Complemento"
                            as={
                                <TextField fullWidth variant="outlined"
                                    error={!!errors.complement}
                                    helperText={errors.complement ? errors.complement.message : ''}
                                    inputProps={{
                                        maxLength: 8
                                    }}/>
                                }/>
                    </Grid>

                </Grid>

                <Grid item container direction='row' spacing={3}>
                    <Grid item lg={4}>
                        <Controller 
                            defaultValue={(initialData && initialData.district) ? initialData.district : ""}
                            name='district'
                            control={control}
                            label="Bairro"
                            as={
                                <TextField fullWidth variant="outlined"
                                    error={!!errors.district}
                                    helperText={errors.district ? errors.district.message : ''}
                                    inputProps={{
                                        maxLength: 40
                                    }}/>
                                }/>
                        
                    </Grid>
                    <Grid item lg={4}>
                        <Controller 
                            defaultValue={(initialData && initialData.city) ? initialData.city : ""}
                            name='city'
                            control={control}
                            label="Cidade"
                            as={
                                <TextField fullWidth variant="outlined"
                                    error={!!errors.cidade}
                                    helperText={errors.city ? errors.city.message : ''}
                                    inputProps={{
                                        maxLength: 40
                                    }}/>
                            }/>
                    </Grid>
                    <Grid item lg={2}>
                        <Controller
                            name="state"
                            control={control}
                            defaultValue={(initialData && initialData.state) ? initialData.state : ""}
                            render={props => (
                                <TextField fullWidth variant="outlined"
                                    {...props}
                                    label="Estado"
                                    error={!!errors.state}
                                    helperText={errors.state ? errors.state.message : ""}
                                    inputProps={{
                                        options: {
                                            uppercase: true
                                        },
                                        maxLength: 2
                                    }}
                                    InputProps={{
                                        inputComponent: CleaveTextField
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item lg={2}>
                        <CountrySelect
                            defaultValue={(initialData && initialData.country) ? initialData.country : "BR"}
                            error={!!errors.country}
                            helperText={errors.country ? errors.country.message : ""}
                            inputRef={register} />
                    </Grid>
                </Grid>

                <Grid item container direction='row-reverse' spacing={3} className={classes.actionRow}>
                    <Button variant="contained" color="primary" className={classes.button} type="submit">Salvar</Button>
                    <Button variant="contained" color="primary" className={classes.button} onClick={handleRemove}>Excluir</Button>
                </Grid>

                {loading && 
                    <Grid item><Backdrop open={true} style={{zIndex: 10}}>
                        <CircularProgress size={75} color='secondary'/> 
                    </Backdrop></Grid>}

            </Grid>
        </form>
    );
}