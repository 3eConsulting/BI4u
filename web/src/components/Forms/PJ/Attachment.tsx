import React from 'react'

import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import {
    makeStyles,
    createStyles
} from '@material-ui/core/styles';

import { useSnackbar } from 'notistack';

/* import {
    usePFaddAttachmentMutation
} from '../../../graphql/generated'; */

import { DropzoneAreaBase, FileObject } from 'material-ui-dropzone';

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

export interface AttachmentFormProps {
    PFCustomerID: string;
    uploadFilesLimit?: number;
    uploadMaxFileSize?: number;
}

export const AttachmentForm: React.FC<AttachmentFormProps> = (
    { PFCustomerID, uploadFilesLimit = 1, uploadMaxFileSize = 25000000 }
) => {

    // CSS
    const classes = useStyles();

    // State
    const [loading, setLoading] = React.useState(false);
    const [key, setKey] = React.useState<string>('');
    const [comments, setComments] = React.useState<string>('');
    const [fileObjects, setFileObjects] = React.useState<FileObject[]>([]);

    // Hooks
    const { enqueueSnackbar } = useSnackbar();
    
    /* const [addAttachment] = usePFaddAttachmentMutation(); */

    // Methods
    const handleKeyChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setKey(event.target.value);
    }

    const handleCommentsChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setComments(event.target.value);
    }

    const handleFileObjectAdd = (newFiles: FileObject[]) => {
        if (!newFiles || newFiles.length !== 1) return;
        if (!key || key === '') setKey(newFiles[0].file.name);
        setFileObjects(newFiles);
    }

    const handleFileObjectRemove = (deletedFileObject: FileObject) => {
        if (key && key === deletedFileObject.file.name) setKey('');
        setFileObjects([]);
    }

    const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        enqueueSnackbar("Anexos estão desabilitados no momento !", {variant: "warning"});
        /* try {
            setLoading(true)
            
            let addResponse = await addAttachment({variables: {
                PFCustomerID: PFCustomerID,
                key: (key && key !== '') ? key : fileObjects[0].file.name,
                comments: comments,
                file: fileObjects[0]
            }});
            console.log(addResponse)
            
            if (addResponse.data) enqueueSnackbar("Arquivo Anexado com Sucesso !", {variant: "success"});
        } catch (err) {
            console.error(err);
            setLoading(false)
            enqueueSnackbar("Erro ao Anexar Arquivo. Tente Novamente em Alguns Minutos.", {variant: "error"});
        } */
    }

    return (
        <form id="PFAttachment" encType="multipart/form-data" className={classes.root} onSubmit={handleAdd} autoComplete="false">
            <Grid container direction='column' spacing={3}>

                
                <Grid item>
                    <TextField fullWidth variant="outlined" InputLabelProps={{ shrink: !!key }} 
                        label="Identificador" value={key} onChange={handleKeyChange}/>
                </Grid>
                <Grid item>
                    <TextField fullWidth variant="outlined" InputLabelProps={{ shrink: !!comments }}
                        label="Comentários" value={comments} onChange={handleCommentsChange}/>
                </Grid>

                <Grid item container direction='row' spacing={3}>
                    <DropzoneAreaBase clearOnUnmount useChipsForPreview
                        showAlerts={['error']}
                        filesLimit={uploadFilesLimit}
                        maxFileSize={uploadMaxFileSize}
                        fileObjects={fileObjects}
                        onAdd={handleFileObjectAdd}
                        onDelete={handleFileObjectRemove}
                        alertSnackbarProps={{
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right'
                            }
                        }}
                        dropzoneText="Arraste e solte arquivos ou clique aqui"
                        getFileLimitExceedMessage={filesLimit =>
                            `Número Máximo de Arquivos Excedido ! Apenas ${filesLimit} Podem Ser Anexados Por Vez.`
                        }
                        getFileAddedMessage={fileName => 
                            `Arquivo '${fileName}' Anexado com Sucesso !`
                        }
                        getFileRemovedMessage={fileName => 
                            `Arquivo '${fileName}' Removido.`
                        }
                        getDropRejectMessage={rejectedFile => 
                            `Arquivo '${rejectedFile.name}' Rejeitado.`
                        }/>
                    
                </Grid>

                <Grid item container direction='row-reverse' spacing={3} className={classes.actionRow}>
                    <Button variant="contained" color="primary" className={classes.button} type='submit'>Salvar</Button>
                </Grid>

                {loading && 
                    <Grid item><Backdrop open={true} style={{zIndex: 10}}>
                        <CircularProgress size={75} color='secondary'/> 
                    </Backdrop></Grid>}

            </Grid>
        </form>
    );
}