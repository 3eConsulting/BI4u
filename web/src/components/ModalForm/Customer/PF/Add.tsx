import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {yupLocale} from '../../../../utilities/misc';

import {
    FormControlLabel,
    Grid,
    MenuItem,
    Switch,
    TextField,
    CircularProgress,
    Backdrop
} from '@material-ui/core';

import { usePFaddCustomerMutation } from '../../../../graphql/generated';
import { useSnackbar } from 'notistack';

interface AddProps {
    closeModal(): void,
}

// Validation Schema
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

export const Add: React.FC<AddProps> = ({closeModal}) => {

    // Hooks
    const {register, handleSubmit, errors, control} = useForm({resolver: yupResolver(validationSchema)});
    const { enqueueSnackbar } = useSnackbar();
    
    const [saveCustomer, {loading}] = usePFaddCustomerMutation();

    const createCustomer = (data: any) => {
        saveCustomer({variables: data})
            .then(result => {
                if (result.data) {
                    enqueueSnackbar(`Cliente criado com sucesso ! [id: ${result.data.PFaddCustomer.id}]`, {variant: 'success'});
                    closeModal();
                }
            })
            .catch(err => {
                console.error(err);
                enqueueSnackbar('Falha ao criar o cliente ! Por favor, tente novamente !', {variant: 'error'});
            })
    }

    const form = (
        <form id="PFAdd" onSubmit={handleSubmit((data) => createCustomer(data))} autoComplete="false">
            <Grid container direction="row-reverse" spacing={3}>
                <Grid item xs={1}>
                    <Controller
                        name="isActive"
                        control={control}
                        defaultValue={true}
                        render={props => <FormControlLabel label="Ativo" control={<Switch color="primary" onChange={e => props.onChange(e.target.checked)} checked={props.value}/>}/>}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="hasDisability"
                        control={control}
                        defaultValue={false}
                        render={props => <FormControlLabel label="Possui Deficiência ?" control={<Switch color="primary" onChange={e => props.onChange(e.target.checked)} checked={props.value}/>}/>}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs>
                    <TextField fullWidth autoFocus variant="outlined"
                        name='firstName'
                        error={!!errors.firstName}
                        helperText={errors.firstName ? errors.firstName.message : ''}
                        label="Nome"
                        inputRef={register}/>
                </Grid>
                <Grid item xs>
                    <TextField fullWidth variant="outlined"
                        name='lastName'
                        error={!!errors.lastName}
                        helperText={errors.lastName ? errors.lastName.message : ''}
                        label="Sobrenome"
                        inputRef={register}/>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <TextField fullWidth variant="outlined"
                        name='CPF'
                        error={!!errors.CPF}
                        helperText={errors.CPF ? errors.CPF.message : ''}
                        label="CPF"
                        inputRef={register}/>
                </Grid>
                <Grid item xs={3}>
                    <TextField fullWidth variant="outlined"
                        name='birthDate'
                        error={!!errors.birthDate}
                        helperText={errors.birthDate ? errors.birthDate.message : ''}
                        label="Data de Nascimento"
                        InputLabelProps={{ shrink: true }}
                        inputRef={register} type="date"/>
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="gender"
                        control={control}
                        defaultValue=''
                        render={props =>
                            <TextField fullWidth select variant="outlined" label="Sexo" 
                                error={!!errors.gender} helperText={errors.gender ? errors.gender.message : ''}
                                value={props.value} onChange={e => props.onChange(e.target.value)}>
                                    {[{value: 'MALE', label: "Masculino"},
                                    {value: 'FEMALE', label: "Feminino"}]
                                        .map(option => 
                                            <MenuItem key={`gender-${option.value}`} value={option.value}>{option.label}</MenuItem>
                                        )}
                            </TextField>
                        }
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="preferedPronoun"
                        control={control}
                        defaultValue=''
                        render={props =>
                            <TextField fullWidth select variant="outlined" label="Pronome de Preferência" 
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
        </form>
    );

    return <>
        {form}
        {loading && 
            <Backdrop open={true} style={{zIndex: 10}}>
                <CircularProgress size={75} color='secondary'/> 
            </Backdrop>    
        }
    </>
        
    
}