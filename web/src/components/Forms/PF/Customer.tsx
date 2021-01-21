import React from 'react'

import * as yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupLocale } from '../../../utilities/misc';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import {
    makeStyles,
    createStyles
} from '@material-ui/core/styles';

import CheckIcon from '@material-ui/icons/Check';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import HotelIcon from '@material-ui/icons/Hotel';

import {
    PfCustomer,
    usePFupdateCustomerMutation,
    usePFremoveCustomersMutation
} from '../../../graphql/generated';

import { useSnackbar } from 'notistack';

import Cleave from 'cleave.js/react';

import moment from 'moment';

const validationSchema = yup.object().shape({
    isActive: yup.boolean().required(yupLocale.required),
    hasDisability: yup.boolean().required(yupLocale.required),
    firstName: yup.string().max(150, yupLocale.string.messages.max).required(yupLocale.required),
    lastName: yup.string().max(150, yupLocale.string.messages.max).required(yupLocale.required),
    CPF: yup.string().required(yupLocale.required).test('isCPF', yupLocale.string.messages.CPF, yupLocale.string.validators.isCPF),
    birthDate: yup.date().required(yupLocale.required).max(new Date(Date.now()), yupLocale.date.messages.max),
    gender: yup.string().required(yupLocale.required),
    preferedPronoun: yup.string().required(yupLocale.required)
})

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

export interface CustomerFormProps {
    initialData?: Partial<PfCustomer>;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ initialData }) => {

    const [loading, setLoading] = React.useState(false)
    const [editable, setEditable] = React.useState<boolean>(false);
    
    // Hooks
    const { handleSubmit, errors, control, reset } = useForm({ resolver: yupResolver(validationSchema) });
    const { enqueueSnackbar } = useSnackbar();
    
    const [updateCustomer] = usePFupdateCustomerMutation();
    const [removeCustomers] = usePFremoveCustomersMutation();

    const handleAddUpdate = async (data: any) => {
        try {
            setLoading(true)
            if (initialData) {
                let updateResponse = await updateCustomer({variables: {
                    PFCustomerID: initialData.id,
                    ...data
                }});
                
                if (updateResponse.data) enqueueSnackbar("Cliente PF Alterado com Sucesso !", {variant: "success"});
                setLoading(false);
                setEditable(false);
            } 
        } catch (err) {
            console.error(err);
            setLoading(false);
            enqueueSnackbar("Erro ao Atualizar Cliente PF. Tente Novamente em Alguns Minutos.", {variant: "error"});
        }
    }

    const handleRemove = async () => {
        try {
            if (initialData && initialData.id){
                setLoading(true);
                let removeResponse = await removeCustomers({variables: {
                    PFCustomerIDS: [initialData.id],
                }});
                
                if (removeResponse.data) enqueueSnackbar("Endereço Removido com Sucesso !", {variant: "success"});
            } else {
                throw new Error("ID Not Found");               
            }
            
        } catch (err) {
            console.error(err);
            setLoading(false);
            enqueueSnackbar("Erro ao Remover Endereço. Tente Novamente em Alguns Minutos.", {variant: "error"})
        }
    }

    // CSS
    const classes = useStyles();

    return (
        <form id="PFCustomer" className={classes.root} onSubmit={handleSubmit((data) => handleAddUpdate(data))} autoComplete="false">
            <Grid container direction='column' spacing={3}>
                <Grid item container alignItems='center' justify='space-between' direction='row-reverse' spacing={1} >
                    
                    {editable ? <Grid item>
                        <Controller
                            name="isActive"
                            control={control}
                            defaultValue={(initialData && initialData.isActive) ? initialData.isActive : false}
                            render={props => 
                                <FormControlLabel label="Ativo" labelPlacement='start' disabled={!editable}
                                    control={
                                        <Switch color="primary" checked={props.value} size='small'
                                            onChange={e => props.onChange(e.target.checked)} />
                                    }
                                />
                            }
                        />
                    </Grid> : (initialData && initialData.isActive) ? <CheckBoxIcon color="primary"/> : ""}
                    {editable ? <Grid item>
                        <Controller
                            name="hasDisability"
                            control={control}
                            defaultValue={(initialData && initialData.hasDisability) ? initialData.hasDisability : false}
                            render={props =>
                                <FormControlLabel label="Portador de Deficiência" labelPlacement='start' disabled={!editable}
                                    control={
                                        <Switch color="primary" checked={props.value} size='small'
                                            onChange={e => props.onChange(e.target.checked)} />
                                    }
                                />
                            }
                        />
                    </Grid> : (initialData && initialData.hasDisability) ? <HotelIcon color="primary"/> : ""}
                    
                    {!editable ? (
                        <Grid item>
                            <Tooltip title='Editar' placement='top' arrow>
                                <IconButton onClick={() => setEditable(true)}>
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Editar' placement='top' arrow>
                                <IconButton onClick={handleRemove}>
                                    <DeleteForeverIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    ) : (
                        <Grid item>
                            <Tooltip title='Cancelar' placement='top' arrow>
                                <IconButton onClick={() => {
                                    setEditable(false);
                                    reset();
                                }}>
                                    <CloseIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Salvar' placement='top' arrow>
                                <IconButton type='submit'>
                                    <CheckIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    )}
                </Grid>

                
                <Grid item>
                    <Controller 
                        defaultValue={(initialData && initialData.firstName) ? initialData.firstName : ""}
                        name='firstName'
                        control={control}
                        label="Nome"
                        as={
                            <TextField fullWidth variant="outlined"
                                error={!!errors.firstName}
                                helperText={errors.firstName ? errors.firstName.message : ""}
                                inputProps={{
                                    maxLength: 150,
                                    readOnly: !editable
                                }}/>
                            }/>
                </Grid>
                <Grid item>
                    <Controller 
                        defaultValue={(initialData && initialData.lastName) ? initialData.lastName : ""}
                        name='lastName'
                        control={control}
                        label="Sobrenome"
                        as={
                            <TextField fullWidth variant="outlined"
                                error={!!errors.lastName}
                                helperText={errors.lastName ? errors.lastName.message : ""}
                                inputProps={{
                                    maxLength: 150,
                                    readOnly: !editable
                                }}/>
                            }/>
                </Grid>
                

                <Grid item container direction='row' justify="space-between" spacing={3}>
                    
                    <Grid item lg={6}>
                        <Controller
                            name="CPF"
                            control={control}
                            defaultValue={(initialData && initialData.CPF) ? initialData.CPF : ""}
                            render={props => (
                                <TextField fullWidth variant="outlined"
                                    {...props}
                                    label="CPF"
                                    
                                    error={!!errors.CPF}
                                    helperText={
                                        errors.CPF ? errors.CPF.message : ""
                                    }
                                    inputProps={{
                                        options: {
                                            delimiters: [".", ".", "-"],
                                            blocks: [3, 3, 3, 2],
                                            numericOnly: true
                                        },
                                        readOnly: !editable
                                    }}
                                    InputProps={{
                                        inputComponent: CleaveTextField
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    
                    <Grid item lg={6}>
                        <Controller 
                            defaultValue={(initialData && initialData.birthDate) ?
                                moment.utc(new Date(initialData.birthDate)).format('yyyy-MM-DD') : ""}                            
                            name='birthDate'
                            control={control}
                            label="Data de Nascimento"
                            as={<TextField fullWidth variant="outlined" type="date"
                                    error={!!errors.birthDate}
                                    helperText={errors.birthDate ? errors.birthDate.message : ""}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        maxLength: 8,
                                        readOnly: !editable
                                    }}/>
                                }/>
                    </Grid>

                </Grid>

                <Grid item container direction='row' justify="space-between" spacing={3}>
                    <Grid item lg={6}>
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue={(initialData && initialData.gender) ? initialData.gender : undefined}
                            render={props =>
                                <TextField fullWidth select variant="outlined" label="Sexo" 
                                    inputProps={{readOnly: !editable}}
                                    error={!!errors.gender} helperText={errors.gender ? errors.gender.message : ''}
                                    value={props.value} onChange={e => props.onChange(e.target.value)}>
                                        {[{value: 'MALE', label: "Masculino"},
                                        {value: 'FEMALE', label: "Feminino"}]
                                            .map(option => 
                                                <MenuItem key={`gender-${option.value}`} value={option.value}>{option.label}</MenuItem>
                                            )}
                                </TextField>
                            }/>
                    </Grid>
                    <Grid item lg={6}>
                        <Controller
                            name="preferedPronoun"
                            control={control}
                            defaultValue={(initialData && initialData.preferedPronoun) ? initialData.preferedPronoun : undefined}
                            render={props =>
                                <TextField fullWidth select variant="outlined" label="Pronome de Preferência" 
                                    inputProps={{readOnly: !editable}}
                                    error={!!errors.preferedPronoun} helperText={errors.preferedPronoun ? errors.preferedPronoun.message : ''}
                                    value={props.value} onChange={e => props.onChange(e.target.value)}>
                                        {[{value: 'MALE', label: "Masculino"},
                                        {value: 'FEMALE', label: "Feminino"},
                                        {value: 'NEUTRAL', label: "Neutro"}]
                                            .map(option =>
                                                <MenuItem key={`preferedPronoun-${option.value}`} value={option.value}>{option.label}</MenuItem>
                                            )}
                                </TextField>
                            }
                        />
                    </Grid>
                </Grid>

                {loading && 
                    <Grid item><Backdrop open={true} style={{zIndex: 10}}>
                        <CircularProgress size={75} color='secondary'/> 
                    </Backdrop></Grid>}

            </Grid>
        </form>
    );
}