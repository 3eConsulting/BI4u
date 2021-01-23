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
    usePFaddDisabilityMutation,
    usePFupdateDisabilityMutation,
    usePFremoveDisabilityMutation,
    usePFfetchDisabilityNomenclatureMutation
} from '../../../graphql/generated';

import { useSnackbar } from 'notistack';

const validationSchema = yup.object().shape({
    CID: yup.string()
        .max(10, yupLocale.string.messages.max)
        .matches(/^([A-Z]{1}\d{2})(\.\d{1})?$/, yupLocale.string.messages.CID)
        .required(yupLocale.required),
    nomenclature: yup.string()
        .max(100, yupLocale.string.messages.max)
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

export interface DisabilityFormProps {
    initialData?: any;
    PFCustomerID: string;
    hasCID(CID:string): boolean;
}

export const DisabilityForm: React.FC<DisabilityFormProps> = ({ initialData, PFCustomerID, hasCID }) => {

    const [loading, setLoading] = React.useState(false)

    // Hooks
    const { handleSubmit, errors, control, getValues, setValue } = useForm({ resolver: yupResolver(validationSchema) });
    const { enqueueSnackbar } = useSnackbar();
    
    const [addDisability] = usePFaddDisabilityMutation();
    const [updateDisability] = usePFupdateDisabilityMutation();
    const [removeDisability] = usePFremoveDisabilityMutation();
    const [fetchDisabilityNomenclature] = usePFfetchDisabilityNomenclatureMutation();

    const syncNomenclature = async () => {
        try {
            setLoading(true);
            let CID = getValues("CID");
            if (!CID) return;
            
            let fetchResponse = await fetchDisabilityNomenclature({variables: {CID: CID}});
            
            if (fetchResponse.data && fetchResponse.data.PFfetchDisabilityNomenclature) {
                setValue("nomenclature", fetchResponse.data.PFfetchDisabilityNomenclature.nomenclature as any);
                setLoading(false);
            } else {
                enqueueSnackbar("CID Não Reconhecido.", {variant: "error"});
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            enqueueSnackbar("Erro ao Sincronizar Nomenclatura. Tente Novamente em Alguns Minutos.", {variant: "error"});
            setLoading(false);
        }
    }

    const handleAddUpdate = async (data: any) => {
        
        if(hasCID(data.CID)) {
            enqueueSnackbar("CID Já Cadastrado Para Este Cliente.", {variant: "info"});
            return;
        }
        
        try {
            setLoading(true)
            if (initialData) {
                let updateResponse = await updateDisability({variables: {
                    PFDisabilityID: initialData.id,
                    ...data
                }});
                
                if (updateResponse.data) enqueueSnackbar("Deficiência Alterada com Sucesso !", {variant: "success"});

            } else {
                let addResponse = await addDisability({variables: {
                    PFCustomerID: PFCustomerID,
                    ...data
                }});
                
                if (addResponse.data) enqueueSnackbar("Nova Deficiência Adicionada com Sucesso !", {variant: "success"});
            }
        } catch (err) {
            console.error(err);
            setLoading(false)
            if (initialData) {
                enqueueSnackbar("Erro ao Atualizar Deficiência. Tente Novamente em Alguns Minutos.", {variant: "error"});
            } else {
                enqueueSnackbar("Erro ao Adicionar Deficiência. Tente Novamente em Alguns Minutos.", {variant: "error"});
            }
        }
    }

    const handleRemove = async () => {
        try {
            if (initialData && initialData.id) {
                setLoading(true)
            
                let removeResponse = await removeDisability({variables: {
                    PFDisabilityIDS: [initialData.id],
                }});
                
                if (removeResponse.data) enqueueSnackbar("Deficiência Removida com Sucesso !", {variant: "success"});
            } else {
                throw new Error("ID Not Found");
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
            enqueueSnackbar("Erro ao Remover Deficiência. Tente Novamente em Alguns Minutos.", {variant: "error"})   
        }
    }

    // CSS
    const classes = useStyles();

    return (
        <form id="PFDisability" className={classes.root} onSubmit={handleSubmit((data) => handleAddUpdate(data))} autoComplete="false">
            <Grid container direction='column' spacing={3}>

                <Grid item container direction='row' spacing={3}>
                    <Grid item lg={3}>
                        <Controller 
                            defaultValue={(initialData && initialData.CID) ? initialData.CID : ""}
                            name='CID'
                            control={control}
                            label="CID"
                            as={
                                <TextField fullWidth variant="outlined"
                                    error={!!errors.CID}
                                    helperText={errors.CID ? errors.CID.message : ""}
                                    inputProps={{
                                        maxLength: 5
                                    }}/>
                                }/>
                        
                    </Grid>
                    <Grid item lg={1}>
                        <Tooltip title="Sincronizar Nomenclatura" placement="bottom" arrow>
                            <IconButton onClick={syncNomenclature}>                            
                                <DoubleArrowIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item lg={8}>
                        <Controller 
                            defaultValue={(initialData && initialData.nomenclature) ? initialData.nomenclature : ""}
                            name='nomenclature'
                            control={control}
                            label="Nomenclatura"
                            as={
                                <TextField fullWidth variant="outlined"
                                    error={!!errors.nomenclature}
                                    helperText={errors.nomenclature ? errors.nomenclature.message : ""}/>
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