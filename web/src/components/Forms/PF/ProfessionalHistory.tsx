import React from 'react'

import * as yup from "yup";
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupLocale } from '../../../utilities/misc';

import PJCustomerSelect from '../../PJCustomerSelect';

import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

import ClearIcon from '@material-ui/icons/Clear';

import {
    makeStyles,
    createStyles,
} from '@material-ui/core/styles';

import {
    KeyboardDatePicker,
    KeyboardDatePickerProps
} from '@material-ui/pickers';
import moment from 'moment';

import {
    PfProfessionalHistory,
    PJfetchCustomersQuery,
    usePFaddProfessionalHistoryMutation,
    usePFremoveProfessionalHistoryMutation,
    usePFupdateProfessionalHistoryMutation
} from '../../../graphql/generated';
import { ApolloError } from '@apollo/client';

import { useSnackbar } from 'notistack';

import {Link as RouterLink} from 'react-router-dom';

const validationSchema = yup.object().shape({
    EPI: yup.boolean().required(yupLocale.required),
    companyID: yup.string().required(yupLocale.required),
    office: yup.string()
        .max(40, yupLocale.string.messages.max)
        .required(yupLocale.required),
    CBO: yup.string()
        .min(4, yupLocale.string.messages.min)
        .max(6, yupLocale.string.messages.max)
        .matches(/^[^\W_]{4,6}$/, yupLocale.string.messages.CEP)
        .required(yupLocale.required),
    admissionDate: yup.date()
        .required(yupLocale.required),
    startDate: yup.date().nullable(),
    recisionDate: yup.date().nullable(),
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
        },
        invertedIcon: {
            transform: "rotate(-180deg)"
        }
    })
);

const DatePickerField = (props: KeyboardDatePickerProps) => {
    return <KeyboardDatePicker {...props} autoOk disableToolbar
        invalidDateMessage="Data Inválida"
        maxDateMessage={props.maxDateMessage ? props.maxDateMessage : "Não é uma Data Valida"}
        minDateMessage={props.minDateMessage ? props.minDateMessage : "Não é uma Data Valida"}
        variant="inline"
        inputVariant="outlined"
        format="DD/MM/yyyy"
        InputAdornmentProps={{ position: "end" }}
        value={props.value}
        onChange={props.onChange}/>
}

const StartDateField = (
    props: KeyboardDatePickerProps & {control: any, initialData?: Partial<PfProfessionalHistory>}
) => {

    let {initialData, ...restOfProps} = props;

    let admissionDate = useWatch({
        control: restOfProps.control,
        name: "admissionDate",
        defaultValue: initialData ? initialData.admissionDate : null
    })

    return <DatePickerField {...restOfProps} minDate={admissionDate}/>;
}

const RecisionDateField = (
    props: KeyboardDatePickerProps & {control: any, initialData?: Partial<PfProfessionalHistory>}
) => {
    let {initialData, ...restOfProps} = props;

    let startDate = useWatch({
        control: restOfProps.control,
        name: "startDate",
        defaultValue: initialData ? initialData.startDate : null
    })

    return <DatePickerField {...restOfProps} minDate={startDate} />;
}
export interface ProfessionalHistoryFormProps {
    initialData?: Partial<PfProfessionalHistory>;    
    PFCustomerID: string;
    PJCustomerQueryData?: PJfetchCustomersQuery;
    PJCustomerQueryLoading: boolean;
    PJCustomerQueryError?: ApolloError;
    refetch(): any
}

export const ProfessionalHistoryForm: React.FC<ProfessionalHistoryFormProps> = (
    { initialData, PFCustomerID, PJCustomerQueryData, PJCustomerQueryLoading, PJCustomerQueryError, refetch}
) => {

    const [loading, setLoading] = React.useState(false)

    // Hooks
    const { handleSubmit, errors, control, register, setValue } = useForm({ resolver: yupResolver(validationSchema) });
    const { enqueueSnackbar } = useSnackbar();
    
    const [addProfessionalHistory] = usePFaddProfessionalHistoryMutation();
    const [updateProfessionalHistory] = usePFupdateProfessionalHistoryMutation();
    const [removeProfessionalHistory] = usePFremoveProfessionalHistoryMutation();

    const handleAddUpdate = async (data: any) => {
        try {
            setLoading(true);
            try {
                if (PJCustomerQueryData) {
                    let PJCustomer = PJCustomerQueryData.PJfetchCustomers.find(value =>
                        value.tradingName === data.companyID
                    );
                    if (!PJCustomer) throw new Error("PJCustomer Not Found");
                    data.companyID = PJCustomer.id;
                } else {
                    throw new Error("PJCustomer Query Unsuccessfull");
                }
            } catch (err) {
                enqueueSnackbar(
                    "Tivemos Dificuldades para Encontrar a Empresa Selecionada. Se o Problema Persistir, Entre em Contato com o Suporte.",
                    {variant: "error"}
                );
                setLoading(false);
                return;
            }

            if (initialData && initialData.id) {
                let updateResponse = await updateProfessionalHistory({variables: {
                    PFProfessionalHistoryID: initialData.id,
                    ...data
                }});
                
                if (updateResponse.data) enqueueSnackbar("Endereço Alterado com Sucesso !", {variant: "success"});

            } else {
                let addResponse = await addProfessionalHistory({variables: {
                    PFCustomerID: PFCustomerID,
                    ...data
                }});
                
                if (addResponse.data) enqueueSnackbar("Novo Endereço Adicionado com Sucesso !", {variant: "success"});
            }
        } catch (err) {
            console.error(err);
            setLoading(false)
            if (initialData) {
                enqueueSnackbar("Erro ao Atualizar Endereço. Tente Novamente em Alguns Minutos.", {variant: "error"});
            } else {
                enqueueSnackbar("Erro ao Adicionar Endereços. Tente Novamente em Alguns Minutos.", {variant: "error"});
            }
        }
    }

    const handleRemove = async () => {
        try {
            if (initialData && initialData.id) {
                setLoading(true)
            
                let removeResponse = await removeProfessionalHistory({variables: {
                    PFProfessionalHistoryIDS: [initialData.id],
                }});
                
                if (removeResponse.data) enqueueSnackbar("Endereço Removido com Sucesso !", {variant: "success"});
                refetch();
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
        <form id="PFProfessionalHistory" className={classes.root} onSubmit={handleSubmit((data) => handleAddUpdate(data), (errors) => console.error(errors))} autoComplete="false">
            <Grid container direction='column' spacing={3}>
                
                <Grid item container direction='row-reverse' >
                    <Grid item>
                        <Controller
                            name="EPI"
                            control={control}
                            defaultValue={(initialData && initialData.EPI) ? initialData.EPI : false}
                            render={props =>
                                <FormControlLabel label="Uso de EPI" labelPlacement='start'
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
                    <Grid item lg={2}>
                        <Controller 
                            defaultValue={(initialData && initialData.CBO) ? initialData.CBO : ""}
                            name="CBO"
                            control={control}
                            label="CBO"
                            as={
                                <TextField fullWidth variant="outlined"
                                    error={!!errors.CBO}
                                    helperText={errors.CBO ? errors.CBO.message : ""}
                                    inputProps={{
                                        maxLength: 6
                                    }}/>
                                }/>
                    </Grid>
                    <Grid item lg={1}>
                        <IconButton disabled={true}>
                            <DoubleArrowIcon className={classes.invertedIcon}/>
                        </IconButton>
                    </Grid>
                    <Grid item lg={1}>
                        <IconButton disabled={true}>
                            <DoubleArrowIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item lg={4}>
                        <Controller 
                            defaultValue={(initialData && initialData.office) ? initialData.office : ""}
                            name='office'
                            control={control}
                            label="Cargo"
                            as={
                                <TextField fullWidth variant="outlined"
                                    error={!!errors.office}
                                    helperText={errors.office ? errors.office.message : ""}
                                    inputProps={{
                                        maxLength: 40
                                    }}/>
                                }/>
                        
                    </Grid>

                    <Grid item lg={4}>
                        <PJCustomerSelect name="companyID"
                            queryData={PJCustomerQueryData}
                            queryLoading={PJCustomerQueryLoading}
                            queryError={PJCustomerQueryError}
                            defaultValue={(initialData && initialData.company) ? initialData.company : undefined}
                            error={!!errors.company}
                            helperText={errors.company ? errors.company.message : ""}
                            inputRef={register} />
                        
                    </Grid>

                </Grid>

                <Grid item container direction='row' spacing={3}>
                    <Grid item lg={4}>
                        <Controller 
                            defaultValue={(initialData && initialData.admissionDate) ?
                                moment.utc((new Date(initialData.admissionDate)).toISOString()).format('DD/MM/yyyy') : null}                            
                            name='admissionDate'
                            control={control}
                            label="Data de Admissão"
                            render={props => <DatePickerField
                                error={!!errors.admissionDate}
                                helperText={errors.admissionDate ? "Data Invalida" : ""}
                                label="Data de Admissão"
                                value={props.value}
                                onChange={props.onChange}/>
                            } />
                    </Grid>
                    <Grid item lg={4}>
                        <Controller 
                            defaultValue={(initialData && initialData.startDate) ?
                                moment.utc((new Date(initialData.startDate)).toISOString()).format('yyyy-MM-DD') : null}                            
                            name='startDate'
                            control={control}
                            label="Data de Início"
                            render={props => <StartDateField
                                error={!!errors.startDate}
                                helperText={errors.startDate ? "Data Invalida" : ""}
                                label="Data de Início"
                                value={props.value}
                                onChange={props.onChange}
                                control={control}
                                initialData={initialData}/>
                                } />
                    </Grid>
                    <Grid item lg={4}>
                        <Controller 
                            defaultValue={(initialData && initialData.recisionDate) ?
                                moment.utc((new Date(initialData.recisionDate)).toISOString()).format('yyyy-MM-DD') : null}                            
                            name='recisionDate'
                            control={control}
                            label="Data de Recisão"
                            render={props => <RecisionDateField
                                InputProps={{
                                    endAdornment: <React.Fragment>
                                        <IconButton onClick={() => setValue('recisionDate', null)}>
                                            <ClearIcon />
                                        </IconButton>
                                    </React.Fragment>
                                }}
                                error={!!errors.startDate}
                                helperText={errors.startDate ? "Data Invalida" : ""}
                                label="Data de Recisão"
                                value={props.value}
                                onChange={props.onChange}
                                control={control}
                                initialData={initialData}/>
                                } />
                    </Grid>
                </Grid>

                <Grid item container direction='row-reverse' spacing={3} className={classes.actionRow}>
                    <Button variant="contained" color="primary" className={classes.button} type="submit">Salvar</Button>
                    {initialData && <Button variant="contained" color="primary" className={classes.button} onClick={handleRemove}>Excluir</Button>}
                    {initialData && initialData.company && <Button component={RouterLink} to={`/customers/PJ/${initialData.company.id}`}
                        className={classes.button}
                        color='primary'
                        variant='contained'>
                            Abrir Empresa
                    </Button>}
                </Grid>

                {loading && 
                    <Grid item><Backdrop open={true} style={{zIndex: 10}}>
                        <CircularProgress size={75} color='secondary'/> 
                    </Backdrop></Grid>}

            </Grid>
        </form>
    );
}