import React from 'react';

import { PFfetchCustomerByIdQuery, PfProfessionalHistory, usePJfetchCustomersQuery } from '../../../graphql/generated';

import { PFProfessionalHistoryForm } from '../../Forms';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LeaveHistoryTab from './LeaveHistoryTab';

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

interface ProfessionalHistoryAccordionProps {
    professionalHistory?: PfProfessionalHistory;
    setNewProfessionalHistoryFormOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    PFCustomerID: string;
    refetch(): any;
    
}

const ProfessionalHistoryAccordion:React.FC<ProfessionalHistoryAccordionProps> = (
    {professionalHistory, setNewProfessionalHistoryFormOpen, PFCustomerID, refetch}
) => {
    
    // CSS
    const classes = useStyles();

    // State
    const [open, setOpen] = React.useState(professionalHistory ? false : true);
    const [leaveHistoryOpen, setLeaveHistoryOpen] = React.useState(false)
    const [professionalHistoryOpen, setProfessionalHistoryOpen] = React.useState(true)

    const {
        data: PJCustomerQueryData,
        loading: PJCustomerQueryLoading,
        error: PJCustomerQueryError,
    } = usePJfetchCustomersQuery();

    // Methods
    const handleChange = () => {
        setOpen(!open);
        if (!professionalHistory && setNewProfessionalHistoryFormOpen) setTimeout(() => setNewProfessionalHistoryFormOpen(false), 500);
    }

    const handleAnimation = () => {
        if (leaveHistoryOpen && !professionalHistoryOpen) {
            setLeaveHistoryOpen(false);
            setTimeout(() => setProfessionalHistoryOpen(true), 300)
        } else {
            setProfessionalHistoryOpen(false);
            setTimeout(() => setLeaveHistoryOpen(true), 300)
        }
    }
    
    if (professionalHistory) {
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
                                <Typography className={classes.accordionHeadingText}>
                                    {professionalHistory.company ? 
                                        professionalHistory.company.tradingName : 
                                        professionalHistory.id}
                                </Typography>
                            </Grid>
                            <Grid item lg ={5}>
                                <Grid container alignContent="center" alignItems="center" spacing={3}>
                                    <Grid item className={classes.accordionSubHeadingText}>
                                        {professionalHistory.office ? professionalHistory.office : ""}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </AccordionSummary>

                    <AccordionDetails>
                        <Grid container direction="row" alignContent="center" alignItems="center" spacing={3}>
                            <Grid item lg={11} >
                                <Slide direction="right" in={professionalHistoryOpen} mountOnEnter unmountOnExit>
                                    <div>
                                        <PFProfessionalHistoryForm refetch={refetch}
                                            initialData={professionalHistory} PFCustomerID={PFCustomerID}
                                            PJCustomerQueryLoading={PJCustomerQueryLoading} 
                                            PJCustomerQueryData={PJCustomerQueryData}
                                            PJCustomerQueryError={PJCustomerQueryError}/>
                                    </div>
                                </Slide>
                                <Slide direction="right" in={leaveHistoryOpen} mountOnEnter unmountOnExit>
                                    <div>
                                        <LeaveHistoryTab professionalHistory={professionalHistory}/>
                                    </div>
                                </Slide>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={handleAnimation}>
                                    <Tooltip arrow
                                        title={professionalHistoryOpen ? "Histórico de Ausência" : "Histórico Profissional"}>
                                        <CachedOutlinedIcon />
                                    </Tooltip>
                                </IconButton>
                            </Grid>
                        </Grid>
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
                            <Typography className={classes.accordionHeadingText}>Novo Registro Profissional</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PFProfessionalHistoryForm PFCustomerID={PFCustomerID} refetch={refetch}
                            PJCustomerQueryLoading={PJCustomerQueryLoading} 
                            PJCustomerQueryData={PJCustomerQueryData}
                            PJCustomerQueryError={PJCustomerQueryError}/>
                    </AccordionDetails>
            </Accordion>
        ); 
    }
}

export interface ProfessionalHistoryTabProps {
    customer?: PFfetchCustomerByIdQuery;
    refetch(): any
}

export const ProfessionalHistoryTab: React.FC<ProfessionalHistoryTabProps> = ({customer, refetch}) => {
    
    // CSS
    const classes = useStyles();

    // State
    const [newProfesisonalHistoryFormOpen, setNewProfessionalHistoryFormOpen] = React.useState(false)

    return (
        <Grid container direction='column'>
            <Grid item container direction='row-reverse' className={classes.actionRow}>
                <Button 
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    onClick={() => setNewProfessionalHistoryFormOpen(true)}>
                        Adicionar Registro Profissional
                </Button>
            </Grid>
            <Grid item>
                {customer && newProfesisonalHistoryFormOpen &&
                    <ProfessionalHistoryAccordion refetch={refetch}
                        setNewProfessionalHistoryFormOpen={setNewProfessionalHistoryFormOpen}
                        PFCustomerID={customer.PFfetchCustomerById.id}
                        />}
                {   customer && 
                    customer.PFfetchCustomerById.PFextraInfo.professionalHistory &&
                    customer.PFfetchCustomerById.PFextraInfo.professionalHistory.map(professionalHistory => 
                        <ProfessionalHistoryAccordion
                            key={professionalHistory.id} refetch={refetch}
                            professionalHistory={professionalHistory}
                            PFCustomerID={customer.PFfetchCustomerById.id}/>) 
                }
                {
                    customer && !newProfesisonalHistoryFormOpen &&
                    (!customer.PFfetchCustomerById.PFextraInfo.professionalHistory || 
                        customer.PFfetchCustomerById.PFextraInfo.professionalHistory.length === 0) && (
                            <React.Fragment>
                                <Typography className={classes.noCustomerFoundWarning}>
                                    Nenhum Registro Profissional Encontrada.
                                </Typography>
                                <Typography className={classes.noCustomerFoundWarning}>
                                    Para Adicionar Novos Registros Profissionais, Utilize o Atalho Acima !
                                </Typography>
                            </React.Fragment>
                        )
                }
            </Grid>
        </Grid>
    );
}

export default ProfessionalHistoryTab;