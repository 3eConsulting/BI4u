import React from 'react';

import { DropzoneDialogBase, FileObject } from 'material-ui-dropzone';

interface AttachmentDropzoneDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fileObjects: FileObject[];
    setFileObjects: React.Dispatch<React.SetStateAction<FileObject[]>>;
    filesLimit?: number;
    maxFileSize?: number;
}

export const AttachmentDropzoneDialog: React.FC<AttachmentDropzoneDialogProps> = ({
    open, setOpen, fileObjects, setFileObjects,
    filesLimit = 1, maxFileSize = 25000000
}) => {

    const addFileObject = (newFileObjects: FileObject[]) => {
        setFileObjects(fileObjects.concat(newFileObjects));
    }

    // FIX THIS
    const removeFileObject = (deletedFileObject: FileObject, index: number) => {
        let newSelection = fileObjects;
        let deleted = newSelection.splice(index, 1)

        if (deleted[0] === deletedFileObject) setFileObjects(newSelection);
    }

    return (
        <DropzoneDialogBase clearOnUnmount useChipsForPreview fullWidth maxWidth="md"
            showAlerts={['error']}
            filesLimit={filesLimit}
            maxFileSize={maxFileSize}
            fileObjects={fileObjects}
            onAdd={addFileObject}
            onDelete={removeFileObject}
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