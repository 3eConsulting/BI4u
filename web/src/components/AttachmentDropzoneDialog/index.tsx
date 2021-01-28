import React from 'react';

import { DropzoneDialog } from 'material-ui-dropzone';


interface AttachmentDropzoneDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AttachmentDropzoneDialog: React.FC<AttachmentDropzoneDialogProps> = ({open, setOpen}) => {
    
    return (
        <DropzoneDialog clearOnUnmount useChipsForPreview fullWidth maxWidth="md"
            open={open}
            onClose={() => setOpen(false)}
            alertSnackbarProps={{
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right'
                }
            }}
            dialogTitle="Anexar Arquivos"
            cancelButtonText="Cancelar"
            submitButtonText="Salvar"
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
            }
            
            
        />
    );
}

export default AttachmentDropzoneDialog;