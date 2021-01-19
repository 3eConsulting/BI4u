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
import StarsIcon from '@material-ui/icons/Stars';


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
}

const AddressAccordion:React.FC<AddressAccordionProps> = ({address}) => {
    
    // CSS
    const classes = useStyles();
    
    return (
        <Accordion className={classes.accordion} elevation={4}>
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
                
                {address.isMain && <StarsIcon className={classes.accordionIcon} color='primary' />}
                
            </AccordionSummary>
        </Accordion>
    ); 
}



export interface AddressTabProps {
    customer?: PFfetchCustomerByIdQuery;
}

export const AddressTab: React.FC<AddressTabProps> = ({customer}) => {
    
    // CSS
    const classes = useStyles();

    //const {data, loading, error} = usePFfetchCustomerByIdQuery({variables: {PFCustomerID: customerID}})
    
    return (
        <Grid container direction='column'>
            <Grid item container direction='row-reverse' className={classes.actionRow}>
                <Button 
                    className={classes.button}
                    variant='contained'
                    color='primary'>
                        Adicionar Endereço
                </Button>
            </Grid>
            <Grid item >
                {   customer && 
                    customer.PFfetchCustomerById.PFextraInfo.addresses &&
                    customer.PFfetchCustomerById.PFextraInfo.addresses.map(address => 
                        <AddressAccordion address={address}/>
                    )
                }
            </Grid>
        </Grid>
    );
}

export default AddressTab;