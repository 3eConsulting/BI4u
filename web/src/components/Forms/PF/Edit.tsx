import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {yupLocale} from '../../../utilities/misc';

import moment from 'moment'

import { PfCustomer } from '../../../graphql/generated';

import {
    FormControlLabel,
    Grid,
    MenuItem,
    Switch,
    TextField
} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography/Typography';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

interface EditProps {
    customer: Partial<PfCustomer>;
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

export const Edit: React.FC<EditProps> = ({    
    customer
}) => {

    const [editable, setEditable] = React.useState<boolean>(false);
    const {register, handleSubmit, errors, control, reset} = useForm({resolver: yupResolver(validationSchema)});

    return (
        <form id="PFEdit" onSubmit={handleSubmit((data) => console.log(data))} autoComplete="false">
            <Grid item container direction='column' justify='space-evenly' spacing={3}>
                <Grid item container alignItems='center' justify='space-between' direction='row-reverse' spacing={3} >

                    {!editable ? (
                        <Grid item>
                            <Tooltip title='Editar' placement='top' arrow>
                                <IconButton onClick={() => setEditable(true)}>
                                    <EditIcon/>
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
                            <Tooltip title='Confirmar' placement='top' arrow>
                                <IconButton onClick={() => setEditable(false)}>
                                    <CheckIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    )}


                    <Grid item>
                        <Controller
                            name="hasDisability"
                            control={control}
                            defaultValue={customer.hasDisability}
                            render={props => 
                                <FormControlLabel 
                                    label="Possui Deficiência ?"
                                    control={
                                        <Switch 
                                            size='small'
                                            color="primary"
                                            onChange={e => editable && props.onChange(e.target.checked)} 
                                            checked={props.value}/>
                                    }
                                />}
                        />
                    </Grid>

                    <Grid item>
                        <Controller
                            name="active"
                            control={control}
                            defaultValue={customer.isActive}
                            render={props => 
                                <FormControlLabel 
                                    label="Ativo"
                                    control={
                                        <Switch 
                                            size='small'
                                            color="primary"
                                            onChange={e => editable && props.onChange(e.target.checked)} 
                                            checked={props.value}/>
                                    }
                                />}
                        />
                    </Grid>

                </Grid>

                <Grid item>
                    <TextField fullWidth variant="outlined"
                        defaultValue={customer.firstName}
                        inputProps={{readOnly: !editable}}
                        name='firstName'
                        error={!!errors.firstName}
                        helperText={errors.firstName ? errors.firstName.message : ''}
                        label="Nome"
                        inputRef={register}/>
                </Grid>

                <Grid item>
                    <TextField fullWidth variant="outlined"
                        defaultValue={customer.lastName}
                        InputProps={{readOnly: !editable}}
                        name='lastName'
                        label="Sobrenome"
                        error={!!errors.lastName}
                        helperText={errors.lastName ? errors.lastName.message : ''}
                    />
                </Grid>

                <Grid item container justify='space-between' spacing={3}>
                    <Grid item xs={6}>
                        <TextField fullWidth variant="outlined"
                            InputProps={{readOnly: !editable}}
                            defaultValue={customer.CPF}
                            name='CPF'
                            error={!!errors.CPF}
                            helperText={errors.CPF ? errors.CPF.message : ''}
                            label="CPF"
                            inputRef={register}/>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth variant="outlined"
                            inputProps={{readOnly: !editable}}
                            defaultValue={moment.utc(new Date(customer.birthDate)).format('yyyy-MM-DD')}
                            name='birthDate'
                            error={!!errors.birthDate}
                            helperText={errors.birthDate ? errors.birthDate.message : ''}
                            label="Data de Nascimento"
                            InputLabelProps={{ shrink: true }}
                            inputRef={register} type="date"/>
                    </Grid>
                </Grid>
                
                <Grid item container justify='space-between' spacing={3}>
                    <Grid item xs={6}>
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue={customer.gender}
                            
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
                            }
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Controller
                            name="preferedPronoun"
                            control={control}
                            defaultValue={customer.preferedPronoun}
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
                <Grid item><Typography variant='caption'>customerID: {customer.id}</Typography></Grid>
            </Grid>
        </form>
    );
}