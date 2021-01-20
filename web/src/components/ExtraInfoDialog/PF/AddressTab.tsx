import React from 'react';

import { PFfetchCustomerByIdQuery } from '../../../graphql/generated';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { PFAddressForm } from '../../Forms';


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
            flexBasis: '40%',
            flexShrink: 0,
        },
        accordionIcon: {
            flexBasis: '40%',
            justifySelf: 'flex-end'
        },
        accordionHeadingText: {
            fontWeight: 'bold',
        },
        accordionSubHeadingText: {
            color: theme.palette.text.disabled,
        }
    })
)

interface AddressAccordionProps {
    address?: any;
    setNewAddressFormOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    defaultName?: string;
    hasMain?: boolean
}

const AddressAccordion:React.FC<AddressAccordionProps> = ({address, setNewAddressFormOpen, defaultName, hasMain}) => {
    
    // State
    const [open, setOpen] = React.useState(address ? false : true);

    // Methods
    const handleChange = () => {
        setOpen(!open);
        if (!address && setNewAddressFormOpen) setTimeout(() => setNewAddressFormOpen(false), 500);
    }

    // CSS
    const classes = useStyles();
    
    if (address) {
        return (
            <Accordion 
                className={classes.accordion}
                expanded={open}
                onChange={handleChange}
                elevation={4} 
                TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <div className={classes.accordionHeading}>
                            <Typography className={classes.accordionHeadingText}>{address.name}</Typography>
                        </div>
                        <div className={classes.accordionSubHeading}>
                            <Typography className={classes.accordionSubHeadingText}>
                                {`${address.street}, ${address.number}`}
                                {address.district && ` - ${address.district}`}
                                {` - ${address.city} - ${address.state}/${address.country}`}
                            </Typography>
                        </div>    
                        {address.isMain && <CheckCircleIcon className={classes.accordionIcon} color='disabled' />}
                    </AccordionSummary>
                        
                    <AccordionDetails>
                        <PFAddressForm initialData={address} hasMain={hasMain}/>
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
                            <Typography className={classes.accordionHeadingText}>Novo Endereço</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PFAddressForm defaultName={defaultName} hasMain={hasMain}/>
                    </AccordionDetails>
            </Accordion>
        ); 
    }
}

const generateAddressDefaultName = (customer: PFfetchCustomerByIdQuery) => {
    
    let startString = `Endereço de ${customer.PFfetchCustomerById.firstName}`;

    if (startString.length > 36) startString = startString.substring(0, 36)

    let addresses = customer.PFfetchCustomerById.PFextraInfo.addresses!;

    let defaultAddresses = addresses.filter(address => {
        return address.name && address.name.startsWith(startString)
    })
    
    if (defaultAddresses.length > 0) {
        return `${startString} (${defaultAddresses.length})`
    } else {
        return startString
    }    
}

const customerHasMainAddress = (customer: PFfetchCustomerByIdQuery) => {
    if (!customer || !customer.PFfetchCustomerById.PFextraInfo.addresses) return false;
    let addresses = customer.PFfetchCustomerById.PFextraInfo.addresses;

    if (addresses.findIndex(address => address.isMain === true) === -1) {
        return false
    } 

    return true;
}
export interface AddressTabProps {
    customer?: PFfetchCustomerByIdQuery;
}

export const AddressTab: React.FC<AddressTabProps> = ({customer}) => {
    
    // CSS
    const classes = useStyles();

    // State
    const [newAddressFormOpen, setNewAddressFormOpen] = React.useState(false)

    // Methods
    

    //const {data, loading, error} = usePFfetchCustomerByIdQuery({variables: {PFCustomerID: customerID}})
    
    return (
        <Grid container direction='column'>
            <Grid item container direction='row-reverse' className={classes.actionRow}>
                <Button 
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    onClick={() => setNewAddressFormOpen(true)}>
                        Adicionar Endereço
                </Button>
            </Grid>
            <Grid item>
                {customer && newAddressFormOpen &&
                    <AddressAccordion 
                        setNewAddressFormOpen={setNewAddressFormOpen} 
                        defaultName={generateAddressDefaultName(customer)}
                        />}
                {   customer && 
                    customer.PFfetchCustomerById.PFextraInfo.addresses &&
                    customer.PFfetchCustomerById.PFextraInfo.addresses.map(address => 
                        <AddressAccordion key={address.id} address={address} hasMain={customerHasMainAddress(customer)}/>
                    )
                }
            </Grid>
        </Grid>
    );
}

export default AddressTab;