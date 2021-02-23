import React from 'react'

import * as yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupLocale } from '../../../utilities/misc';

import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

import {
    makeStyles,
    createStyles
} from '@material-ui/core/styles';

import { 
    usePJaddActivityClassificationMutation,
    usePJupdateActivityClassificationMutation,
    usePJremoveActivityClassificationsMutation,
    PjActivityClassification
} from '../../../graphql/generated';

import { useSnackbar } from 'notistack';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import axios from 'axios';

const validationSchema = yup.object().shape({
    isMain: yup.boolean().required(yupLocale.required),
    CNAE: yup.string()
        .max(7, yupLocale.string.messages.max)
        .matches(/^\d{7}$/, yupLocale.string.messages.CNAE)
        .required(yupLocale.required),
    description: yup.string()
        .required(yupLocale.required),
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

export interface ActivityClassificationFormProps {
    initialData?: PjActivityClassification;
    PJCustomerID: string;
    hasMain: boolean;
    hasCNAE(CNAE:string): boolean;
}

export const ActivityClassification: React.FC<ActivityClassificationFormProps> = ({ initialData, PJCustomerID, hasMain, hasCNAE }) => {

    const [loading, setLoading] = React.useState(false)

    // Hooks
    const { handleSubmit, errors, control, getValues, setValue } = useForm({ resolver: yupResolver(validationSchema) });
    const { enqueueSnackbar } = useSnackbar();
    
    const [addActivityClassification] = usePJaddActivityClassificationMutation();
    const [updateActivityClassification] = usePJupdateActivityClassificationMutation();
    const [removeActivityClassification] = usePJremoveActivityClassificationsMutation();
    /* const [fetchDisabilityNomenclature] = usePFfetchDisabilityNomenclatureMutation(); */

    // Methods
    const syncDescription = async () => {
        try {
            setLoading(true);
            
            let CNAE = getValues("CNAE");
            if (!CNAE || CNAE.length !== 7) {
                setLoading(false);
                return
            };

            let response = await axios.get(`https://servicodados.ibge.gov.br/api/v2/cnae/subclasses/${CNAE}`);
            if (!(response.status === 200 || response.statusText === "OK")) {
                setLoading(false)
                return;
            }

            if (response.data && response.data[0] && response.data[0].descricao) {
                setValue('description', response.data[0].descricao);
            }

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
                
                if (initialData.CNAE !== data.CNAE) {
                    if(hasCNAE(data.CNAE)) {
                        enqueueSnackbar("CNAE Já Cadastrado Para Este Cliente.", {variant: "info"});
                        return;
                    }
                }

                let updateResponse = await updateActivityClassification({variables: {
                    PJActivityID: initialData.id,
                    ...data
                }});
                
                if (updateResponse.data) enqueueSnackbar("Classificação de Atividade Alterada com Sucesso !", {variant: "success"});

            } else {
                if(hasCNAE(data.CNAE)) {
                    enqueueSnackbar("CNAE Já Cadastrado Para Este Cliente.", {variant: "info"});
                    return;
                }
                let addResponse = await addActivityClassification({variables: {
                    PJCustomerID: PJCustomerID,
                    ...data
                }});
                
                if (addResponse.data) enqueueSnackbar("Nova Classificação de Atividade Adicionada com Sucesso !", {variant: "success"});
            }
        } catch (err) {
            console.error(err);
            setLoading(false)
            if (initialData) {
                enqueueSnackbar("Erro ao Atualizar Classificação de Atividade. Tente Novamente em Alguns Minutos.", {variant: "error"});
            } else {
                enqueueSnackbar("Erro ao Adicionar Classificação de Atividade. Tente Novamente em Alguns Minutos.", {variant: "error"});
            }
        }
    }

    const handleRemove = async () => {
        try {
            if (initialData && initialData.id) {
                setLoading(true)
            
                let removeResponse = await removeActivityClassification({variables: {
                    PJActivityIDS: [initialData.id],
                }});
                
                if (removeResponse.data) enqueueSnackbar("Classificação de Atividade Removida com Sucesso !", {variant: "success"});
            } else {
                throw new Error("ID Not Found");
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
            enqueueSnackbar("Erro ao Remover Classificação de Atividade. Tente Novamente em Alguns Minutos.", {variant: "error"})   
        }
    }

    // CSS
    const classes = useStyles();

    return (
        <form id="PFActivityClassification" className={classes.root} onSubmit={handleSubmit((data) => handleAddUpdate(data))} autoComplete="false">
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
                </Grid>


                <Grid item container direction='row' spacing={3}>
                    <Grid item lg={3}>
                        <Controller 
                            defaultValue={(initialData && initialData.CNAE) ? initialData.CNAE : ""}
                            name='CNAE'
                            control={control}
                            label="CNAE"
                            as={
                                <TextField fullWidth variant="outlined"
                                    error={!!errors.CNAE}
                                    helperText={errors.CNAE ? errors.CNAE.message : ""}
                                    inputProps={{
                                        maxLength: 7
                                    }}/>
                                }/>                        
                    </Grid>

                    <Grid item lg={1}>
                        <Tooltip title="Sincronizar Descrição" placement="bottom" arrow>
                            <IconButton  onClick={() => syncDescription()} >
                                <DoubleArrowIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>

                    <Grid item lg={8}>
                        <Controller 
                            defaultValue={(initialData && initialData.description) ? initialData.description : ""}
                            name='description'
                            control={control}
                            label="Descrição da Atividade"
                            as={
                                <TextField fullWidth variant="outlined"
                                    error={!!errors.description}
                                    helperText={errors.description ? errors.description.message : ""}/>
                                }/>
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