import React from 'react';

import { PFfetchCustomerByIdQuery } from '../../../graphql/generated';

import { PFAddressForm } from '../../Forms';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {PFgenerateDefaultName} from '../../../utilities/misc'


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
        accordionSubHeading: {
            flexBasis: '40%',
            flexShrink: 0
        },
        accordionHeadingText: {
            fontWeight: 'bold'
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
    hasMain: boolean
    PFCustomerID: string;
}

const AddressAccordion:React.FC<AddressAccordionProps> = ({address, setNewAddressFormOpen, defaultName, hasMain, PFCustomerID}) => {
    
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
                            
                            <Grid container direction="row" alignContent="center" alignItems="center" spacing={3}>
                                <Grid item lg={4}>
                                    <Badge variant="dot" color="primary" invisible={!address.isMain}>
                                        <Typography className={classes.accordionHeadingText}>{address.name}</Typography>
                                    </Badge>
                                </Grid>
                                <Grid item>
                                    <Grid container alignContent="center" alignItems="center" spacing={3}>
                                        <Grid item className={classes.accordionSubHeadingText}>
                                            {`${address.street}, ${address.number}`}
                                            {address.district && ` - ${address.district}`}
                                            {` - ${address.city} - ${address.state}/${address.country}`}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </AccordionSummary>

                    <AccordionDetails>
                        <PFAddressForm initialData={address} hasMain={hasMain} PFCustomerID={PFCustomerID}/>
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
                        <PFAddressForm defaultName={defaultName} hasMain={hasMain} PFCustomerID={PFCustomerID}/>
                    </AccordionDetails>
            </Accordion>
        ); 
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
                        hasMain={customerHasMainAddress(customer)}
                        defaultName={PFgenerateDefaultName(customer, "address")}
                        PFCustomerID={customer.PFfetchCustomerById.id}
                        />}
                {   customer && 
                    customer.PFfetchCustomerById.PFextraInfo.addresses &&
                    customer.PFfetchCustomerById.PFextraInfo.addresses.map(address => 
                        <AddressAccordion 
                            key={address.id}
                            address={address}
                            hasMain={customerHasMainAddress(customer)}
                            PFCustomerID={customer.PFfetchCustomerById.id}/>
                    ) 
                }
            </Grid>
        </Grid>
    );
}

export default AddressTab;