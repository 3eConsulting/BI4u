import React from 'react';

import { PfLeaveHistory, PfProfessionalHistory } from '../../../graphql/generated';

import { PFLeaveHistoryForm } from '../../Forms';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import moment from 'moment';


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

interface LeaveHistoryAccordionProps {
    leaveHistory?: PfLeaveHistory;
    setNewLeaveHistoryFormOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    professionalHistory: PfProfessionalHistory;
}

const LeaveHistoryAccordion:React.FC<LeaveHistoryAccordionProps> = (
    {leaveHistory, setNewLeaveHistoryFormOpen, professionalHistory}
) => {
    
    // State
    const [open, setOpen] = React.useState(leaveHistory ? false : true);

    // Methods
    const handleChange = () => {
        setOpen(!open);
        if (!leaveHistory && setNewLeaveHistoryFormOpen) setTimeout(() => setNewLeaveHistoryFormOpen(false), 500);
    }

    // CSS
    const classes = useStyles();
    
    if (leaveHistory) {
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
                                <Badge variant="dot" color="primary" invisible={!leaveHistory.isINSS}>
                                    <Typography className={classes.accordionHeadingText}>{leaveHistory.reason}</Typography>
                                </Badge>
                            </Grid>
                            <Grid item>
                                <Grid container alignContent="center" alignItems="center" spacing={3}>
                                    <Grid item className={classes.accordionSubHeadingText}>
                                        {`${moment.utc(new Date(leaveHistory.leaveDate))
                                            .format('DD/MM/yyyy')
                                        } ${leaveHistory.returnDate ?
                                            `- ${moment.utc(
                                                new Date(leaveHistory.returnDate)
                                            ).format('DD/MM/yyyy')}` : ""}`}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionSummary>

                    <AccordionDetails>
                        <PFLeaveHistoryForm initialData={leaveHistory} professionalHistory={professionalHistory}/>
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
                            <Typography className={classes.accordionHeadingText}>Novo Afastamento</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PFLeaveHistoryForm professionalHistory={professionalHistory}/>
                    </AccordionDetails>
            </Accordion>
        ); 
    }
}

export interface LeaveHistoryTabProps {
    professionalHistory: PfProfessionalHistory
}

export const LeaveHistoryTab: React.FC<LeaveHistoryTabProps> = ({professionalHistory}) => {
    
    // CSS
    const classes = useStyles();

    // State
    const [newLeaveHistoryFormOpen, setNewLeaveHistoryFormOpen] = React.useState(false)
    
    return (
        <Grid container direction='column'>
            <Grid item container direction='row-reverse' className={classes.actionRow}>
                <Button 
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    onClick={() => setNewLeaveHistoryFormOpen(true)}>
                        Adicionar Afastamento
                </Button>
            </Grid>
            <Grid item>
                {newLeaveHistoryFormOpen &&
                    <LeaveHistoryAccordion 
                        setNewLeaveHistoryFormOpen={setNewLeaveHistoryFormOpen}
                        professionalHistory={professionalHistory}
                        />}
                {   professionalHistory && professionalHistory.leaveHistory &&
                    professionalHistory.leaveHistory.map(leave => 
                        <LeaveHistoryAccordion 
                            key={leave.id}
                            leaveHistory={leave}
                            professionalHistory={professionalHistory}/>
                    ) 
                }
                {
                    professionalHistory && !newLeaveHistoryFormOpen &&
                    (!professionalHistory.leaveHistory || 
                        professionalHistory.leaveHistory.length === 0) && (
                            <React.Fragment>
                                <Typography className={classes.noCustomerFoundWarning}>
                                    Nenhum Afastamento Encontrado.
                                </Typography>
                                <Typography className={classes.noCustomerFoundWarning}>
                                    Para Adicionar Novos Afastamentos, Utilize o Atalho Acima !
                                </Typography>
                            </React.Fragment>
                        )
                }
            </Grid>
        </Grid>
    );
}

export default LeaveHistoryTab;