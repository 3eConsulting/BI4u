import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {yupLocale} from '../../../../utilities/misc';

import {
    FormControlLabel,
    Grid,
    Switch,
    TextField,
    CircularProgress,
    Backdrop
} from '@material-ui/core';

import { usePJcreateBaseCustomerMutation } from '../../../../graphql/generated';
import { useSnackbar } from 'notistack';

interface AddProps {
    closeModal(): void,
}

// Validation Schema
const validationSchema = yup.object().shape({
    isActive: yup.boolean().required(yupLocale.required),
    isAssociated: yup.boolean().required(yupLocale.required),
    tradingName: yup.string().max(256, yupLocale.string.messages.max).required(yupLocale.required),
    legalName: yup.string().max(256, yupLocale.string.messages.max).required(yupLocale.required),
    CNPJ: yup.string().required(yupLocale.required).test('isCNPJ', yupLocale.string.messages.CNPJ, yupLocale.string.validators.isCNPJ),
})

export const Add: React.FC<AddProps> = ({closeModal}) => {

    // Hooks
    const {register, handleSubmit, errors, control} = useForm({resolver: yupResolver(validationSchema)});
    
    const [saveCustomer, {loading}] = usePJcreateBaseCustomerMutation();
    const { enqueueSnackbar } = useSnackbar();

    const createCustomer = (data: any) => {
        saveCustomer({variables: data})
            .then(result => {
                if (result.data) {
                    enqueueSnackbar(`Cliente criado com sucesso ! [id: ${result.data.PJcreateBaseCustomer.id}]`, {variant: 'success'});
                    closeModal();
                }
            })
            .catch(err => {
                console.error(err);
                enqueueSnackbar('Falha ao criar o cliente ! Por favor, tente novamente !', {variant: 'error'});
            })
    }

    const form = (
        <form id="PJAdd" onSubmit={handleSubmit((data) => createCustomer(data))} autoComplete="false">
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
                        name="isAssociated"
                        control={control}
                        defaultValue={false}
                        render={props => <FormControlLabel label="Associado" control={<Switch color="primary" onChange={e => props.onChange(e.target.checked)} checked={props.value}/>}/>}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs>
                    <TextField fullWidth autoFocus variant="outlined"
                        name='legalName'
                        error={!!errors.legalName}
                        helperText={errors.legalName ? errors.legalName.message : ''}
                        label="Razão Social"
                        inputRef={register}/>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs>
                    <TextField fullWidth variant="outlined"
                        name='tradingName'
                        error={!!errors.tradingName}
                        helperText={errors.tradingName ? errors.tradingName.message : ''}
                        label="Nome Fantasia"
                        inputRef={register}/>
                </Grid>
                <Grid item xs={3}>
                    <TextField fullWidth variant="outlined"
                        name='CNPJ'
                        error={!!errors.CNPJ}
                        helperText={errors.CNPJ ? errors.CNPJ.message : ''}
                        label="CNPJ"
                        inputRef={register}/>
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