import React from 'react';

import { PJfetchCustomerByIdQuery, PjActivityClassification } from '../../../graphql/generated';

import { PJActivityClassificationForm } from '../../Forms';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
        accordionHeadingText: {
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
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

interface ActivityClassificationAccordionProps {
    activityClassification?: PjActivityClassification;
    PJCustomerID: string;
    setNewActivityClassificationFormOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    hasMain: boolean;
    hasCNAE(CNAE:string): boolean;
}

const ActivityClassificationAccordion:React.FC<ActivityClassificationAccordionProps> = (
    {activityClassification, setNewActivityClassificationFormOpen, PJCustomerID, hasMain, hasCNAE}
) => {
    
    // State
    const [open, setOpen] = React.useState(activityClassification ? false : true);

    // Methods
    const handleChange = () => {
        setOpen(!open);
        if (!activityClassification && setNewActivityClassificationFormOpen) setTimeout(() => setNewActivityClassificationFormOpen(false), 500);
    }

    // CSS
    const classes = useStyles();
    
    if (activityClassification) {
        return (
            <Accordion 
                className={classes.accordion}
                expanded={open}
                onChange={handleChange}
                elevation={4} 
                TransitionProps={{ unmountOnExit: true }}>  
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Grid container direction="row" alignContent="center" alignItems="center" spacing={3}>
                            <Grid item lg={8}>
                                <Typography className={classes.accordionHeadingText}>{activityClassification.description}</Typography>
                            </Grid>
                            <Grid item>
                                <Grid container alignContent="center" alignItems="center" spacing={3}>
                                    <Grid item className={classes.accordionSubHeadingText}>
                                        {activityClassification.CNAE}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionSummary>

                    <AccordionDetails>
                        <PJActivityClassificationForm hasMain={hasMain} hasCNAE={hasCNAE}
                            initialData={activityClassification} PJCustomerID={PJCustomerID}/>
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
                        <Typography className={classes.accordionHeadingText}>Nova Classificação de Atividade</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PJActivityClassificationForm hasMain={hasMain} hasCNAE={hasCNAE}
                            initialData={activityClassification} PJCustomerID={PJCustomerID}/>
                    </AccordionDetails>
            </Accordion>
        ); 
    }
}

export interface ActivityClassificationTabProps {
    customer?: PJfetchCustomerByIdQuery;
}

const customerHasMainActivityClassification = (customer: PJfetchCustomerByIdQuery) => {
    if (!customer || !customer.PJfetchCustomerById.PJextraInfo.activities) return false;
    let activities = customer.PJfetchCustomerById.PJextraInfo.activities;

    if (activities.findIndex(activity => activity.isMain === true) === -1) {
        return false
    } 

    return true;
}

export const ActivityClassificationTab: React.FC<ActivityClassificationTabProps> = ({customer}) => {
    
    // CSS
    const classes = useStyles();

    // State
    const [newActivityClassificationFormOpen, setNewActivityClassificationFormOpen] = React.useState(false);

    // Methods
    const hasCNAE = (CNAE: string) => {
        if (!customer || !customer.PJfetchCustomerById.PJextraInfo.activities) return false;
        return customer.PJfetchCustomerById.PJextraInfo.activities.findIndex(
            activity => activity.CNAE === CNAE
        ) !== -1;
    }

    return (
        <Grid container direction='column'>
            <Grid item container direction='row-reverse' className={classes.actionRow}>
                <Button 
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    onClick={() => setNewActivityClassificationFormOpen(true)}>
                        Adicionar Classificação de Atividade
                </Button>
            </Grid>
            <Grid item>
                {customer && newActivityClassificationFormOpen &&
                    <ActivityClassificationAccordion hasMain={customerHasMainActivityClassification(customer)}
                        hasCNAE={hasCNAE}
                        setNewActivityClassificationFormOpen={setNewActivityClassificationFormOpen}
                        PJCustomerID={customer.PJfetchCustomerById.id}/>}
                {   customer && 
                    customer.PJfetchCustomerById.PJextraInfo.activities &&
                    customer.PJfetchCustomerById.PJextraInfo.activities.map(activityClassification => 
                        <ActivityClassificationAccordion hasMain={customerHasMainActivityClassification(customer)}
                            hasCNAE={hasCNAE}
                            key={activityClassification.id}
                            activityClassification={activityClassification}
                            PJCustomerID={customer.PJfetchCustomerById.id}/>
                    ) 
                }
                {
                    customer &&
                    (!customer.PJfetchCustomerById.PJextraInfo.activities || 
                        customer.PJfetchCustomerById.PJextraInfo.activities.length === 0) && (
                            <React.Fragment>
                                <Typography className={classes.noCustomerFoundWarning}>
                                    Nenhuma Classificação de Atividade Encontrada.
                                </Typography>
                                <Typography className={classes.noCustomerFoundWarning}>
                                    Para Adicionar Novas Classificações de Atividade, Utilize o Atalho Acima !
                                </Typography>
                            </React.Fragment>
                        )
                }
            </Grid>
        </Grid>
    );
}

export default ActivityClassificationTab;