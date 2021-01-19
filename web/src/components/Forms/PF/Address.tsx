import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {yupLocale} from '../../../utilities/misc';

import {
    FormControlLabel,
    Grid,
    MenuItem,
    Switch,
    TextField,
    CircularProgress,
    Backdrop
} from '@material-ui/core';

import { usePFaddAddressMutation } from '../../../graphql/generated';
import { useSnackbar } from 'notistack';

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

export interface AddressFormProps {
    initialData?: any;
}

export const AddressForm: React.FC<AddressFormProps> = ({initialData}) => {
 
    // Hooks
    const {register, handleSubmit, errors, control} = useForm({resolver: yupResolver(validationSchema)});
    const { enqueueSnackbar } = useSnackbar();

    return (
        <form id="PFAddress" onSubmit={handleSubmit((data) => console.log(data))} autoComplete="false">
            <Grid container direction='row-reverse'>
                <Grid item xs={1}>
                    <Controller
                        name="isMain"
                        control={control}
                        defaultValue={false}
                        render={props => 
                            <FormControlLabel label="Ativo"
                                control={
                                    <Switch color="primary" checked={props.value} size='small'
                                        onChange={e => props.onChange(e.target.checked)}/>
                                }
                            />
                        }
                    />
                </Grid>
            </Grid>
        </form>
    );
}