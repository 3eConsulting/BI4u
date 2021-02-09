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
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

import {
    PfCustomer,
    PjCustomer,
    usePJupdateCustomerMutation,
    usePJremoveCustomersMutation,
} from '../../../graphql/generated';

import { useSnackbar } from 'notistack';

import Cleave from 'cleave.js/react';

import moment from 'moment';

const validationSchema = yup.object().shape({
    isActive: yup.boolean().required(yupLocale.required),
    isAssociated: yup.boolean().required(yupLocale.required),
    legalName: yup.string().required(yupLocale.required),
    tradingName: yup.string().required(yupLocale.required),
    CNPJ: yup.string().required(yupLocale.required).test('isCNPJ', yupLocale.string.messages.CNPJ, yupLocale.string.validators.isCNPJ),
})

const useStyles = makeStyles(
    theme => createStyles({
        root: {
            width: '100%',
            height: '100%',
            padding: theme.spacing(2)
        },
        option: {
            fontSize: 15,
            '& > span': {
                marginRight: 10,
                fontSize: 18,
            }
        },
        button: {
            color: theme.palette.common.white,
            margin: theme.spacing(1),
        },
        actionRow: {
            padding: theme.spacing(2),
        }
    })
);

const CleaveTextField = ({ inputRef, options, ...otherProps }: any) => (
    <Cleave {...otherProps} htmlRef={inputRef} options={options} />
);

export interface CustomerFormProps {
    initialData?: Partial<PjCustomer>;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ initialData }) => {

    const [loading, setLoading] = React.useState(false)
    const [editable, setEditable] = React.useState<boolean>(false);
    
    // Hooks
    const { handleSubmit, errors, control, reset } = useForm({ resolver: yupResolver(validationSchema) });
    const { enqueueSnackbar } = useSnackbar();
    
    const [updateCustomer] = usePJupdateCustomerMutation();
    const [removeCustomers] = usePJremoveCustomersMutation();

    const handleAddUpdate = async (data: any) => {
        try {
            setLoading(true)
            if (initialData) {
                let updateResponse = await updateCustomer({variables: {
                    PJCustomerID: initialData.id,
                    ...data
                }});
                
                if (updateResponse.data) enqueueSnackbar("Cliente PJ Alterado com Sucesso !", {variant: "success"});
                setLoading(false);
                setEditable(false);
            } 
        } catch (err) {
            console.error(err);
            setLoading(false);
            enqueueSnackbar("Erro ao Atualizar Cliente PJ. Tente Novamente em Alguns Minutos.", {variant: "error"});
        }
    }

    const handleRemove = async () => {
        try {
            if (initialData && initialData.id){
                setLoading(true);
                let removeResponse = await removeCustomers({variables: {
                    PJCustomerIDS: [initialData.id],
                }});
                
                if (removeResponse.data) enqueueSnackbar("Cliente PJ Removido com Sucesso !", {variant: "success"});
            } else {
                throw new Error("ID Not Found");               
            }
            
        } catch (err) {
            console.error(err);
            setLoading(false);
            enqueueSnackbar("Erro ao Remover Cliente PJ. Tente Novamente em Alguns Minutos.", {variant: "error"})
        }
    }

    // CSS
    const classes = useStyles();

    return (
        <form id="PJCustomer" className={classes.root} onSubmit={handleSubmit((data) => handleAddUpdate(data))} action="javascript:void(0);" autoComplete="false">
            <Grid container direction='column' spacing={3}>
                <Grid item container alignItems='center' justify='space-between' direction='row-reverse' spacing={1}>
                    
                    <Grid item lg={8} container direction="row" justify="flex-end" spacing={1}>
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
                        </Grid> : (initialData && initialData.isActive) ? <CheckBoxOutlinedIcon color="primary"/> : ""}
                        {editable ? <Grid item>
                            <Controller
                                name="isAssociated"
                                control={control}
                                defaultValue={(initialData && initialData.isAssociated) ? initialData.isAssociated : false}
                                render={props =>
                                    <FormControlLabel label="Cliente PJ Associado" labelPlacement='start' disabled={!editable}
                                        control={
                                            <Switch color="primary" checked={props.value} size='small'
                                                onChange={e => props.onChange(e.target.checked)} />
                                        }
                                    />
                                }
                            />
                        </Grid> : (initialData && initialData.isAssociated) ? <LoyaltyIcon color="primary"/> : ""}
                    </Grid>
                    <Grid item lg={4} container direction="row" justify="flex-start" spacing={1}>
                        {!editable ? (
                            <Grid item>
                                <Tooltip title='Editar' placement='top' arrow>
                                    <IconButton onClick={() => setEditable(true)}>
                                        <EditIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Excluir' placement='top' arrow>
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
                </Grid>

                
                <Grid item>
                    <Controller 
                        defaultValue={(initialData && initialData.legalName) ? initialData.legalName : ""}
                        name='legalName'
                        control={control}
                        label="Razão Social"
                        as={
                            <TextField fullWidth variant="outlined"
                                error={!!errors.legalName}
                                helperText={errors.legalName ? errors.legalName.message : ""}
                                inputProps={{
                                    readOnly: !editable
                                }}/>
                            }/>
                </Grid>
                <Grid item>
                    <Controller 
                        defaultValue={(initialData && initialData.tradingName) ? initialData.tradingName : ""}
                        name='tradingName'
                        control={control}
                        label="Nome Fantasia"
                        as={
                            <TextField fullWidth variant="outlined"
                                error={!!errors.tradingName}
                                helperText={errors.tradingName ? errors.tradingName.message : ""}
                                inputProps={{
                                    readOnly: !editable
                                }}/>
                            }/>
                </Grid>
                

                <Grid item container direction='row' justify="space-between" spacing={3}>
                    
                    <Grid item lg={12}>
                        <Controller
                            name="CNPJ"
                            control={control}
                            defaultValue={(initialData && initialData.CNPJ) ? initialData.CNPJ : ""}
                            render={props => (
                                <TextField fullWidth variant="outlined"
                                    {...props}
                                    label="CNPJ"
                                    
                                    error={!!errors.CNPJ}
                                    helperText={
                                        errors.CNPJ ? errors.CNPJ.message : ""
                                    }
                                    inputProps={{
                                        options: {
                                            delimiters: [".", ".", "/", "-"],
                                            blocks: [2, 3, 3, 4, 2],
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
                    
                </Grid>

                {loading && 
                    <Grid item><Backdrop open={true} style={{zIndex: 10}}>
                        <CircularProgress size={75} color='secondary'/> 
                    </Backdrop></Grid>}

            </Grid>
        </form>
    );
}