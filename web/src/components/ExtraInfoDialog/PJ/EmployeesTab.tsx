import React from 'react';

import { PfCustomer, PJfetchCustomerByIdQuery, usePJfetchEmployeesQuery } from '../../../graphql/generated';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {Link as RouterLink} from 'react-router-dom';

import { PFCustomerForm } from '../../Forms';
import { useSnackbar } from 'notistack';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


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

interface EmployeeAccordionProps {
    employee?: PfCustomer;
    setNewEmployeeFormOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    PJCustomerID: string;
    connectedEmployees?: PfCustomer[];
}

const EmployeeAccordion:React.FC<EmployeeAccordionProps> = (
    {employee, setNewEmployeeFormOpen, PJCustomerID, connectedEmployees}
) => {
    
    // State
    const [open, setOpen] = React.useState(employee ? false : true);

    // Methods
    const handleChange = () => {
        setOpen(!open);
        if (!employee && setNewEmployeeFormOpen) setTimeout(() => setNewEmployeeFormOpen(false), 500);
    }

    // CSS
    const classes = useStyles();
    
    if (employee) {
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
                                    <Badge variant="dot" color="primary" invisible={!employee.isActive}>
                                        <Typography className={classes.accordionHeadingText}>
                                            {employee.firstName} {employee.lastName}
                                        </Typography>
                                    </Badge>
                                </Grid>
                                <Grid item>
                                    <Grid container alignContent="center" alignItems="center" spacing={3}>
                                        <Grid item className={classes.accordionSubHeadingText}>
                                            {employee.CPF}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                                
                        </AccordionSummary>

                    <AccordionDetails>
                        <PFCustomerForm initialData={employee} forceReadOnly={true}/>
                    </AccordionDetails>
                    <AccordionActions>
                        <Button component={RouterLink} to={`/customers/PF/${employee.id}`}
                            className={classes.button}
                            color='primary'
                            variant='contained'>
                                Abrir Funcionario
                        </Button>
                    </AccordionActions>

                    
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
                            <Typography className={classes.accordionHeadingText}>Novo Funcionário</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.noCustomerFoundWarning}>
                            Ação Indisponível no Momento
                        </Typography>
                    </AccordionDetails>
            </Accordion>
        ); 
    }
}

export interface EmployeesTabProps {
    customer: PJfetchCustomerByIdQuery;
}

export const EmployeesTab: React.FC<EmployeesTabProps> = ({customer}) => {
    
    // CSS
    const classes = useStyles();

    // State
    const [newEmployeeFormOpen, setNewEmployeeFormOpen] = React.useState(false);    

    // Hooks
    const {enqueueSnackbar} = useSnackbar();

    // Effects
    const {data: employeesData, loading: employeesLoading, error: employeesError} = usePJfetchEmployeesQuery({variables: {PJCustomerID: customer.PJfetchCustomerById.id}});

    if (employeesError) enqueueSnackbar("Erro ao buscar funcionários. Por favor, tente novamente !", {variant: "error"});
    

    return (
        <Grid container direction='column'>
            {/* <Grid item container direction='row-reverse' className={classes.actionRow}>
                <Button 
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    onClick={() => setNewEmployeeFormOpen(true)}>
                        Adicionar Funcionário
                </Button>
            </Grid> */}
            <Grid item>
                <>
                    {customer && employeesData && employeesData.PJfetchEmployees && newEmployeeFormOpen &&
                        <EmployeeAccordion 
                            setNewEmployeeFormOpen={setNewEmployeeFormOpen} 
                            PJCustomerID={customer.PJfetchCustomerById.id}
                            connectedEmployees={employeesData.PJfetchEmployees}
                            />}
                    
                    {customer && employeesData && employeesData.PJfetchEmployees && employeesData.PJfetchEmployees.length > 0 &&
                        employeesData.PJfetchEmployees.map(employee => 
                            <EmployeeAccordion 
                                key={employee.id}
                                employee={employee}
                                PJCustomerID={customer.PJfetchCustomerById.id}/>)}
                                    
                    {(!employeesData || !employeesData.PJfetchEmployees || employeesData.PJfetchEmployees.length === 0) && (   
                        <Typography className={classes.noCustomerFoundWarning}>
                            Nenhum Funcionário Encontrado.
                        </Typography>
                    )}
                </>
            </Grid>
            {employeesLoading && 
                <Grid item><Backdrop open={true} style={{zIndex: 10}}>
                    <CircularProgress size={75} color='secondary'/> 
                </Backdrop></Grid>}
        </Grid>
    );
}

export default EmployeesTab;