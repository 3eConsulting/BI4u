import React from 'react'

import * as yup from "yup";
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupLocale } from '../../../utilities/misc';

import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

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
    PfLeaveHistory,
    usePFaddLeaveHistoryMutation,
    usePFupdateLeaveHistoryMutation,
    usePFremoveLeaveHistoryMutation,
    PfProfessionalHistory
} from '../../../graphql/generated';

import { useSnackbar } from 'notistack';

const validationSchema = yup.object().shape({
    isINSS: yup.boolean().required(yupLocale.required),
    reason: yup.string()
        .required(yupLocale.required),
    leaveDate: yup.date()
        .required(yupLocale.required),
    returnDate: yup.date(),
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
        },
        dateField: {
            width: '100%'
        }
    })
);

const DatePickerField = (props: KeyboardDatePickerProps) => {
    // CSS
    const classes = useStyles();

    return <KeyboardDatePicker {...props} autoOk
        invalidDateMessage="Data Inválida" className={classes.dateField}
        maxDateMessage={props.maxDateMessage ? props.maxDateMessage : "Não é uma Data Valida"}
        minDateMessage={props.minDateMessage ? props.minDateMessage : "Não é uma Data Valida"}
        variant="inline"
        inputVariant="outlined"
        format="DD/MM/yyyy"
        InputAdornmentProps={{ position: "end" }}
        value={props.value}
        onChange={props.onChange}/>
}

const LeaveDateField = (
    props: KeyboardDatePickerProps & {control: any, defaultMaxDate: any }
) => {
        
    let {defaultMaxDate, ...restOfProps} = props
    
    let returnDate = useWatch({
        control: props.control,
        name: "returnDate",
        defaultValue: defaultMaxDate
    })

    return <DatePickerField {...restOfProps} maxDate={returnDate ? returnDate : defaultMaxDate}/>;
}

const ReturnDateField = (
    props: KeyboardDatePickerProps & {control: any, defaultMinDate: any }
) => {

    let {defaultMinDate, ...restOfProps} = props;

    let leaveDate = useWatch({
        control: props.control,
        name: "leaveDate",
        defaultValue: defaultMinDate
    })

    return <DatePickerField {...restOfProps} minDate={leaveDate ? leaveDate : defaultMinDate}/>;
}

export interface LeaveHistoryFormProps {
    initialData?: Partial<PfLeaveHistory>;    
    professionalHistory: Partial<PfProfessionalHistory>;
}

export const LeaveHistoryForm: React.FC<LeaveHistoryFormProps> = (
    { initialData, professionalHistory }
) => {

    const [loading, setLoading] = React.useState(false)

    // Hooks
    const { handleSubmit, errors, control } = useForm({ resolver: yupResolver(validationSchema) });
    const { enqueueSnackbar } = useSnackbar();
    
    const [addLeaveHistory] = usePFaddLeaveHistoryMutation();
    const [updateLeaveHistory] = usePFupdateLeaveHistoryMutation();
    const [removeLeaveHistory] = usePFremoveLeaveHistoryMutation();

    const handleAddUpdate = async (data: any) => {
        try {
            setLoading(true);

            if (initialData && initialData.id) {
                let updateResponse = await updateLeaveHistory({variables: {
                    PFLeaveHistoryID: initialData.id,
                    ...data
                }});
                
                if (updateResponse.data) enqueueSnackbar("Ausência Alterada com Sucesso !", {variant: "success"});

            } else {
                let addResponse = await addLeaveHistory({variables: {
                    PFProfessionalHistoryID: professionalHistory.id,
                    ...data
                }});
                
                if (addResponse.data) enqueueSnackbar("Nova Ausência Adicionada com Sucesso !", {variant: "success"});
            }
        } catch (err) {
            console.error(err);
            setLoading(false)
            if (initialData) {
                enqueueSnackbar("Erro ao Atualizar Ausência. Tente Novamente em Alguns Minutos.", {variant: "error"});
            } else {
                enqueueSnackbar("Erro ao Adicionar Ausência. Tente Novamente em Alguns Minutos.", {variant: "error"});
            }
        }
    }

    const handleRemove = async () => {
        try {
            if (initialData && initialData.id) {
                setLoading(true)
            
                let removeResponse = await removeLeaveHistory({variables: {
                    PFLeaveHistoryIDS: [initialData.id],
                }});
                
                if (removeResponse.data) enqueueSnackbar("Ausência Removida com Sucesso !", {variant: "success"});
                
            } else {
                throw new Error("ID Not Found");
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
            enqueueSnackbar("Erro ao Remover Ausência. Tente Novamente em Alguns Minutos.", {variant: "error"})   
        }
    }

    // CSS
    const classes = useStyles();

    return (
        <form id="PFProfessionalHistory" className={classes.root} onSubmit={handleSubmit((data) => handleAddUpdate(data))} autoComplete="false">
            <Grid container direction='column' spacing={3}>
                
                <Grid item container direction='row-reverse' >
                    <Grid item>
                        <Controller
                            name="isINSS"
                            control={control}
                            defaultValue={(initialData && initialData.isINSS) ? initialData.isINSS : false}
                            render={props =>
                                <FormControlLabel label="INSS" labelPlacement='start'
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
                            defaultValue={(initialData && initialData.leaveDate) ?
                                moment.utc(new Date(initialData.leaveDate)).format('DD/MM/yyyy') : null}                            
                            name='leaveDate'
                            control={control}
                            label="Data de Início"
                            render={props => <LeaveDateField
                                error={!!errors.startDate}
                                helperText={errors.startDate ? "Data Invalida" : ""}
                                label="Data de Início"
                                value={props.value}
                                onChange={props.onChange}
                                control={control}
                                defaultMaxDate={new Date(professionalHistory.recisionDate).toISOString()}
                                minDate={new Date(professionalHistory.admissionDate).toISOString()}/>
                            }/>
                    </Grid>
                    <Grid item lg={6}>
                        <Controller 
                            defaultValue={(initialData && initialData.returnDate) ?
                                moment.utc(new Date(initialData.returnDate)).format('yyyy-MM-DD') : null}                            
                            name='returnDate'
                            control={control}
                            label="Data de Retorno"
                            render={props => <ReturnDateField
                                error={!!errors.startDate}
                                helperText={errors.startDate ? "Data Invalida" : ""}
                                label="Data de Retorno"
                                value={props.value}
                                onChange={props.onChange}
                                control={control}
                                defaultMinDate={professionalHistory.admissionDate}
                                maxDate={professionalHistory.recisionDate}/>
                            }/>
                    </Grid>
                </Grid>
                

                <Grid item>
                    <Controller
                        name="reason"
                        control={control}
                        defaultValue={(initialData && initialData.reason) ? initialData.reason : ""}
                        render={props => (
                            <TextField fullWidth variant="outlined"
                                {...props}
                                label="Razão"
                                error={!!errors.reason}
                                helperText={errors.reason ? errors.reason.message : ""}/>
                        )}
                    />
                </Grid>

                <Grid item container direction='row-reverse' spacing={3} className={classes.actionRow}>
                    <Button variant="contained" color="primary" className={classes.button} type="submit">Salvar</Button>
                    {initialData && <Button variant="contained" color="primary" className={classes.button} onClick={handleRemove}>Excluir</Button>}
                </Grid>

                {loading && 
                    <Grid item><Backdrop open={true} style={{zIndex: 10}}>
                        <CircularProgress size={75} color='secondary'/> 
                    </Backdrop></Grid>}

            </Grid>
        </form>
    );
}