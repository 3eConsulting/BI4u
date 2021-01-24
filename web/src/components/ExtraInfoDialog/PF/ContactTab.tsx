import React from 'react';

import { PFfetchCustomerByIdQuery } from '../../../graphql/generated';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import { PFContactForm } from '../../Forms';
import { Badge } from '@material-ui/core';
import { PFgenerateDefaultName } from '../../../utilities/misc';


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
            flexShrink: 0,
        },
        accordionSubHeading: {
            flexBasis: '60%',
            flexShrink: 0
        },
        accordionHeadingText: {
            fontWeight: 'bold',
        },
        accordionSubHeadingText: {
            color: theme.palette.text.disabled,
        }
    })
)

interface ContactAccordionProps {
    contact?: any;
    defaultName?: string;
    setNewContactFormOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    hasMain: boolean
    PFCustomerID: string;
}

const ContactAccordion:React.FC<ContactAccordionProps> = (
    {contact, defaultName, setNewContactFormOpen, hasMain, PFCustomerID}
) => {
    
    // State
    const [open, setOpen] = React.useState(contact ? false : true);

    // Methods
    const handleChange = () => {
        setOpen(!open);
        if (!contact && setNewContactFormOpen) setTimeout(() => setNewContactFormOpen(false), 500);
    }

    // CSS
    const classes = useStyles();
    
    if (contact) {
        return (
            <Accordion 
                className={classes.accordion}
                expanded={open}
                onChange={handleChange}
                elevation={4} 
                TransitionProps={{ unmountOnExit: true }}>
                    
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            
                            <Grid container direction="row" alignContent="center" alignItems="center" spacing={3}>
                                <Grid item lg={4}>
                                    <Badge variant="dot" color="primary" invisible={!contact.isMain}>
                                        <Typography className={classes.accordionHeadingText}>
                                            {contact.name}
                                        </Typography>
                                    </Badge>
                                </Grid>
                                <Grid item>
                                    <Grid container alignContent="center" alignItems="center" spacing={3}>
                                        <Grid item className={classes.accordionSubHeadingText}>
                                            {contact.email ? `${contact.email}` : 
                                                contact.mobilePhone ? `Telefone Celular: ${contact.mobilePhone}` :
                                                contact.phone ? `Telefone Fixo: ${contact.phone}` : 
                                                `ID: ${contact.id}`}
                                        </Grid>
                                        <Grid item>
                                            {contact.isWhatsApp && <WhatsAppIcon color="primary"/>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                                
                        </AccordionSummary>

                    <AccordionDetails>
                        <PFContactForm initialData={contact} hasMain={hasMain} PFCustomerID={PFCustomerID}/>
                    </AccordionDetails>

                    
            </Accordion>
            
        )
    } else {
        return (
            <Accordion 
                className={classes.accordion}
                expanded={open}
                onChange={handleChange}
                elevation={4} 
                TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <div className={classes.accordionHeading}>
                            <Typography className={classes.accordionHeadingText}>Novo Contato</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PFContactForm defaultName={defaultName} hasMain={hasMain} PFCustomerID={PFCustomerID}/>
                    </AccordionDetails>
            </Accordion>
        ); 
    }
}

const customerHasMainContact = (customer: PFfetchCustomerByIdQuery) => {
    if (!customer || !customer.PFfetchCustomerById.PFextraInfo.contacts) return false;
    let contacts = customer.PFfetchCustomerById.PFextraInfo.contacts;

    if (contacts.findIndex(address => address.isMain === true) === -1) {
        return false
    } 

    return true;
}
export interface ContactTabProps {
    customer?: PFfetchCustomerByIdQuery;
}

export const ContactTab: React.FC<ContactTabProps> = ({customer}) => {
    
    // CSS
    const classes = useStyles();

    // State
    const [newAddressFormOpen, setNewAddressFormOpen] = React.useState(false)
    
    return (
        <Grid container direction='column'>
            <Grid item container direction='row-reverse' className={classes.actionRow}>
                <Button 
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    onClick={() => setNewAddressFormOpen(true)}>
                        Adicionar Contato
                </Button>
            </Grid>
            <Grid item>
                {customer && newAddressFormOpen &&
                    <ContactAccordion 
                        setNewContactFormOpen={setNewAddressFormOpen} 
                        hasMain={customerHasMainContact(customer)}
                        defaultName={PFgenerateDefaultName(customer, "contact")}
                        PFCustomerID={customer.PFfetchCustomerById.id}
                        />}
                {   customer && 
                    customer.PFfetchCustomerById.PFextraInfo.contacts &&
                    customer.PFfetchCustomerById.PFextraInfo.contacts.map(contact => 
                        <ContactAccordion 
                            key={contact.id}
                            contact={contact}
                            hasMain={customerHasMainContact(customer)}
                            PFCustomerID={customer.PFfetchCustomerById.id}/>
                    ) 
                }
            </Grid>
        </Grid>
    );
}

export default ContactTab;