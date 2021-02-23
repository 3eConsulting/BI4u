import React from 'react'

import * as yup from "yup";
import { Control, Controller, useForm, useWatch } from 'react-hook-form';
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
    createStyles
} from '@material-ui/core/styles';

import {
    PjContact,
    usePJaddContactMutation,
    usePJremoveContactsMutation,
    usePJupdateContactMutation
} from '../../../graphql/generated';

import { useSnackbar } from 'notistack';

import Cleave from 'cleave.js/react';


const validationSchema = yup.object().shape({
    isMain: yup.boolean()
            .required(yupLocale.required),
    isWhatsApp: yup.boolean()
            .required(yupLocale.required),
    contactEmployeeName: yup.string()
            .required(yupLocale.required),
    email: yup.string()
            .email()
            .nullable(),
    phone: yup.string()
            .matches(/(\d{2})-(\d{8})/, {message: yupLocale.string.messages.phone, excludeEmptyString: true})
            .nullable(),
    mobilePhone: yup.string()
            .matches(/(\d{2})-(\d{9})/, {message: yupLocale.string.messages.mobilePhone, excludeEmptyString: true})
            .nullable(),
    site: yup.string()
            .url(yupLocale.string.messages.URL)
            .nullable()
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

const IsWhatsAppSwitch = ({ control, controllerProps, initialData }: { control: Control<any>, controllerProps: any, initialData: any }) => {
    const mobilePhone = useWatch({
        control,
        name: "mobilePhone",
        defaultValue: (initialData && initialData.mobilePhone) ? initialData.mobilePhone : null
    });

    return (
        <FormControlLabel label="WhatsApp" labelPlacement='start'
            disabled={!mobilePhone}
            control={
                <Switch color="primary" checked={controllerProps.value} size='small'
                    onChange={e => controllerProps.onChange(e.target.checked)} />
            }
        />
    )

}

export interface ContactFormProps {
    initialData?: PjContact;
    defaultName?: string;
    hasMain: boolean;
    PJCustomerID: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialData, defaultName, hasMain, PJCustomerID }) => {

    const [loading, setLoading] = React.useState(false)
    
    // Hooks
    const { handleSubmit, errors, control } = useForm({ resolver: yupResolver(validationSchema) });
    const { enqueueSnackbar } = useSnackbar();
    
    const [addContact] = usePJaddContactMutation();
    const [updateContact] = usePJupdateContactMutation();
    const [removeContact] = usePJremoveContactsMutation();

    const handleAddUpdate = async (data: any) => {
        try {
            setLoading(true)
            if (initialData) {
                let updateResponse = await updateContact({variables: {
                    PJContactID: initialData.id,
                    ...data
                }});
                
                if (updateResponse.data) enqueueSnackbar("Contato Alterado com Sucesso !", {variant: "success"});

            } else {
                let addResponse = await addContact({variables: {
                    PJCustomerID: PJCustomerID,
                    ...data
                }});
                
                if (addResponse.data) enqueueSnackbar("Novo Contato Adicionado com Sucesso !", {variant: "success"});
            }
            
        } catch (err) {
            console.error(err);
            setLoading(false);
            if (initialData) {
                enqueueSnackbar("Erro ao Atualizar Contato. Tente Novamente em Alguns Minutos.", {variant: "error"});
            } else {
                enqueueSnackbar("Erro ao Adicionar Contato. Tente Novamente em Alguns Minutos.", {variant: "error"});
            }
        }
    }

    const handleRemove = async () => {
        try {
            if (initialData && initialData.id) {
                setLoading(true);
                let removeResponse = await removeContact({variables: {
                    PJContactIDS: [initialData.id],
                }});
                
                if (removeResponse.data) enqueueSnackbar("Contato Removido com Sucesso !", {variant: "success"});
            } else {
                throw new Error("ID Not Found");
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
            enqueueSnackbar("Erro ao Remover Contato. Tente Novamente em Alguns Minutos.", {variant: "error"})
        }
    }

    // CSS
    const classes = useStyles();

    return (
        <form id="PJContact" className={classes.root} onSubmit={handleSubmit((data) => handleAddUpdate(data))} autoComplete="false">
            <Grid container direction='column' spacing={3}>
                
                <Grid item container direction='row-reverse'>
                    <Grid item>
                        <Controller
                            name="isMain"
                            control={control}
                            defaultValue={(initialData && initialData.isMain) ? initialData.isMain : false}
                            render={props =>
                                <FormControlLabel label="Principal" labelPlacement='start'
                                    disabled={(hasMain && (!initialData || (initialData && !initialData.isMain))) }
                                    control={
                                        <Switch color="primary" checked={props.value} size='small'
                                            onChange={e => props.onChange(e.target.checked)} />
                                    }
                                />
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            name="isWhatsApp"
                            control={control}
                            defaultValue={(initialData && initialData.isWhatsApp) ? initialData.isWhatsApp : false}
                            render={props =>
                                <IsWhatsAppSwitch initialData={initialData} control={control} controllerProps={props} />
                            }
                        />
                    </Grid>
                </Grid>

                <Grid item container direction='row' spacing={3}>
                    <Grid item xs={12}>
                        <Controller
                            name="contactEmployeeName"
                            control={control}
                            defaultValue={(initialData && initialData.contactEmployeeName) ? initialData.contactEmployeeName : defaultName ? defaultName : ""}
                            render={props => (
                                <TextField fullWidth variant="outlined"
                                    {...props}
                                    label="Nome do Responsável"
                                    error={!!errors.contactEmployeeName}
                                    helperText={errors.contactEmployeeName ? errors.contactEmployeeName.message : ""}/>
                            )}
                        />
                    </Grid>
                </Grid>

                <Grid item container direction='row' spacing={3}>
                    <Grid item lg={6}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue={(initialData && initialData.email) ? initialData.email : null}
                            render={props => (
                                <TextField fullWidth variant="outlined"
                                    {...props}
                                    label="Email"
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ""}
                                    InputProps={{
                                        inputComponent: CleaveTextField
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item lg={3}>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue={(initialData && initialData.phone) ? initialData.phone : null}
                            render={props => (
                                <TextField fullWidth variant="outlined"
                                    {...props}
                                    label="Telefone Fixo"
                                    error={!!errors.phone}
                                    helperText={
                                        errors.phone ? errors.phone.message : ""
                                    }
                                    inputProps={{
                                        options: {
                                            delimiters: ["-"],
                                            blocks: [2, 8],
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
                    <Grid item lg={3}>
                        <Controller
                            name="mobilePhone"
                            control={control}
                            defaultValue={(initialData && initialData.mobilePhone) ? initialData.mobilePhone : null}
                            render={props => (
                                <TextField fullWidth variant="outlined"
                                    {...props}
                                    label="Telefone Celular"
                                    error={!!errors.mobilePhone}
                                    helperText={
                                        errors.mobilePhone ? errors.mobilePhone.message : ""
                                    }
                                    inputProps={{
                                        options: {
                                            delimiters: ["-"],
                                            blocks: [2, 9],
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
                    <Grid item xs={12}>
                        <Controller
                            name="site"
                            control={control}
                            defaultValue={(initialData && initialData.site) ? initialData.site : null}
                            render={props => (
                                <TextField fullWidth variant="outlined"
                                    {...props}
                                    label="Site"
                                    error={!!errors.site}
                                    helperText={errors.site ? errors.site.message : ""}
                                    InputProps={{
                                        inputComponent: CleaveTextField
                                    }}
                                />
                            )}
                        />
                    </Grid>
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