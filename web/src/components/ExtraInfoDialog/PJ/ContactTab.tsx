import React from 'react';

import { PjContact, PJfetchCustomerByIdQuery } from '../../../graphql/generated';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import { PJContactForm } from '../../Forms';
import { PJgenerateDefaultName } from '../../../utilities/misc';


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
        },
        noCustomerFoundWarning: {
            fontSize: '2rem',
            textAlign: 'center',
            color: '#afafaf',
            padding: '5px',
            marginTop: '20px',
            marginBottom: '20px'
        }
    })
)

interface ContactAccordionProps {
    contact?: PjContact;
    defaultName?: string;
    setNewContactFormOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    hasMain: boolean
    PJCustomerID: string;
}

const ContactAccordion:React.FC<ContactAccordionProps> = (
    {contact, defaultName, setNewContactFormOpen, hasMain, PJCustomerID}
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
                                            {contact.contactEmployeeName}
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
                        <PJContactForm initialData={contact} hasMain={hasMain} PJCustomerID={PJCustomerID}/>
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
                        <PJContactForm defaultName={defaultName} hasMain={hasMain} PJCustomerID={PJCustomerID}/>
                    </AccordionDetails>
            </Accordion>
        ); 
    }
}

const customerHasMainContact = (customer: PJfetchCustomerByIdQuery) => {
    if (!customer || !customer.PJfetchCustomerById.PJextraInfo.contacts) return false;
    let contacts = customer.PJfetchCustomerById.PJextraInfo.contacts;

    if (contacts.findIndex(contact => contact.isMain === true) === -1) {
        return false;
    } 

    return true;
}
export interface ContactTabProps {
    customer?: PJfetchCustomerByIdQuery;
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
                        defaultName={PJgenerateDefaultName(customer, "contact")}
                        PJCustomerID={customer.PJfetchCustomerById.id}
                        />}
                {   customer && 
                    customer.PJfetchCustomerById.PJextraInfo.contacts &&
                    customer.PJfetchCustomerById.PJextraInfo.contacts.map(contact => 
                        <ContactAccordion 
                            key={contact.id}
                            contact={contact}
                            hasMain={customerHasMainContact(customer)}
                            PJCustomerID={customer.PJfetchCustomerById.id}/>
                    ) 
                }
                {
                    customer &&
                    (!customer.PJfetchCustomerById.PJextraInfo.contacts || 
                        customer.PJfetchCustomerById.PJextraInfo.contacts.length === 0) && (
                            <React.Fragment>
                                <Typography className={classes.noCustomerFoundWarning}>
                                    Nenhum Contato Encontrado.
                                </Typography>
                                <Typography className={classes.noCustomerFoundWarning}>
                                    Para Adicionar Novos Contatos, Utilize o Atalho Acima !
                                </Typography>
                            </React.Fragment>
                        )
                }
            </Grid>
        </Grid>
    );
}

export default ContactTab;