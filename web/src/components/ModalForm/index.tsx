import React from 'react'

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {Add as PFAdd} from './Customer/PF/Add';
import {Add as PJAdd} from './Customer/PJ/Add';

export type FormVariants = 'PFAdd' | 'PJAdd';

interface ModalFormProps {
    open: boolean;
    onClose(): void; 
    variant: FormVariants;
    title: string;
    text?: string | React.ReactNode;
}

const fetchForm = (variant: FormVariants, onClose: () => void) => {
    switch (variant) {
        case 'PFAdd': 
            return <PFAdd closeModal={onClose}/>;
        case 'PJAdd': 
            return <PJAdd closeModal={onClose}/>;    
        
        default:
            return <Typography>Formulário não Encontrado =(</Typography>
    }
}

const useStyles = makeStyles(theme => createStyles({
    actionButton: {
        color: theme.palette.common.white
    },
    contentContainer: {
        overflowY: "hidden"
    }
}))


export const ModalForm: React.FC<ModalFormProps> = ({variant, title, open, text, onClose}) => {
    
    const classes = useStyles();

    return (
        <Dialog fullWidth maxWidth='xl' open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent className={classes.contentContainer}>
                {text && <DialogContentText>{text}</DialogContentText>}
                {fetchForm(variant, onClose)}
            </DialogContent>
            <DialogActions>
                <Button className={classes.actionButton} 
                    variant="contained" color='primary'
                    type="submit" form={variant}>Salvar</Button>
                <Button className={classes.actionButton}
                    variant="contained" color='primary'
                    onClick={onClose}>Cancelar</Button>
            </DialogActions>
        </Dialog>
    );
}