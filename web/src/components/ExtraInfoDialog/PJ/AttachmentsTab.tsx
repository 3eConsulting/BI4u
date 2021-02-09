import React from 'react';

import { PFfetchCustomerByIdQuery } from '../../../graphql/generated';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AttachmentCard from '../../AttachmentCard';
import { PFAttachmentForm } from '../../Forms';

const useStyles = makeStyles(
    (theme) => createStyles({
        root: {
            
        },
        actionRow: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
        button: {
            color: theme.palette.common.white
        },
        accordion: {
            border: `1px solid #efefef`,
            marginTop: theme.spacing(1)
        },
        accordionHeading: {
            flexBasis: '40%',
            flexShrink: 0
        },
        accordionHeadingText: {
            fontWeight: 'bold'
        },
        accordionSubHeading: {
            flexBasis: '40%',
            flexShrink: 0
        },
        noCustomerFoundWarning: {
            fontSize: '2rem',
            textAlign: 'center',
            color: '#afafaf',
            padding: '5px',
            marginTop: '20px',
            marginBottom: '20px'
        },
        girdListRoot: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
        },
        gridList: {
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        icon: {
            color: 'white',
        },
    })
)

interface NewAttachmentAccordionProps {
    setNewAttachmentAccordionOpen: React.Dispatch<React.SetStateAction<boolean>>;
    PFCustomerID: string;
}

const NewAttachmentAccordion:React.FC<NewAttachmentAccordionProps> = (
    {setNewAttachmentAccordionOpen, PFCustomerID}
) => {
    
    //State
    const [open, setOpen] = React.useState(true);
    // Methods
    const handleChange = () => {
        setOpen(!open);
        setTimeout(() => setNewAttachmentAccordionOpen(false), 500);
    }

    // CSS
    const classes = useStyles();
    
    return (
        <Accordion
            className={classes.accordion}
            expanded={open}
            onChange={handleChange}
            elevation={4} 
            TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <div className={classes.accordionHeading}>
                        <Typography className={classes.accordionHeadingText}>Novo Anexo</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <PFAttachmentForm PFCustomerID={PFCustomerID}/>
                </AccordionDetails>
        </Accordion>
    ); 
    
}

export interface AttachmentTabProps {
    customer?: PFfetchCustomerByIdQuery;
}

export const AttachmentTab: React.FC<AttachmentTabProps> = ({customer}) => {
    
    // CSS
    const classes = useStyles();

    // State
    const [newAttachmentFormOpen, setNewAttachmentFormOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Grid container direction='column' spacing={3}>
                {!newAttachmentFormOpen && <Grid item container direction='row-reverse' className={classes.actionRow}>
                    <Button 
                        className={classes.button}
                        variant='contained'
                        color='primary'
                        onClick={() => setNewAttachmentFormOpen(true)}>
                            Anexar Arquivo
                    </Button>
                </Grid>}
                
                {customer && !newAttachmentFormOpen && (
                    !customer.PFfetchCustomerById.PFextraInfo.attachments || 
                    customer.PFfetchCustomerById.PFextraInfo.attachments.length === 0) && (
                        <Grid item>
                            <Typography className={classes.noCustomerFoundWarning}>
                                Nenhum Anexo Encontrado.
                            </Typography>
                            <Typography className={classes.noCustomerFoundWarning}>
                                Para Adicionar Novos Endereços, Utilize o Atalho Acima !
                            </Typography>
                        </Grid>)}

                {customer && newAttachmentFormOpen && (
                    <Grid item>
                        <NewAttachmentAccordion 
                            PFCustomerID={customer.PFfetchCustomerById.id} 
                            setNewAttachmentAccordionOpen={setNewAttachmentFormOpen}/>
                    </Grid>
                )}

                {customer && customer.PFfetchCustomerById.PFextraInfo.attachments &&
                    <Grid item container direction='row' spacing={3}> 
                        {customer.PFfetchCustomerById.PFextraInfo.attachments.map(attachment => 
                            <Grid item lg={4} key={attachment.id}>
                                <AttachmentCard attachment={attachment} />
                            </Grid>)}
                    </Grid>}
                
            </Grid>
        </React.Fragment>
    );
}

export default AttachmentTab;