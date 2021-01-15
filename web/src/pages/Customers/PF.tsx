import React from "react"

import { useHistory } from "react-router-dom";

import { ExtendedTable } from '../../components/Table';
import { ModalForm } from '../../components/ModalForm';

import { 
    FetchPfCustomersNameQuery,
    PJfetchCustomersQuery,
    useFetchCustomersQuery,
    useRemoveCustomersMutation,
    usePFaddCompanyMutation,
    usePFremoveCompanyMutation,
    usePFfetchCustomersByIdQuery,
} from "../../graphql/generated";

import {
    createStyles,
    makeStyles
} from '@material-ui/core/styles';

import { useSnackbar } from 'notistack';

import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid, { GridProps } from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import LabelIcon from '@material-ui/icons/Label';
import CloseIcon from '@material-ui/icons/Close';

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import { Edit } from "../../components/ModalForm/Customer/PF/Edit";
import { Tabs } from "@material-ui/core";
import Tab from "@material-ui/core/Tab/Tab";
import Box from "@material-ui/core/Box/Box";

// PF Page CSS
const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			
		},
		container: {
			marginTop: '5%',
		},
		speedDial: {
			position: 'absolute',
			bottom: theme.spacing(3),
			left: theme.spacing(3),
		},
		button: {
			color: theme.palette.common.white,
        },
        linkButton: {
            color: theme.palette.common.white,
            marginRight: '10px'
        },
        extraInfoDialogContentRoot: {
            height: `calc(100vh - ${theme.spacing(3)}px)`,
        },
        tabPanel: {
            height: '75vh'
        }
	})
);

// PF Customer Extra Info Dialog
interface ExtraInfoDialogProps {
	open: boolean;
	onClose(): void;
	PFcustomerID: string;
}

interface TabPanelProps extends GridProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }

const ExtraInfoDialog: React.FC<ExtraInfoDialogProps> = ({
    open, PFcustomerID,
    onClose,
}) => {

    const classes = useStyles();

    const [tab, setTab] = React.useState<'addresses' | 'contacts' | 'disabilities' | 'professionalHistory'>('addresses')

    const {data, loading, error} = usePFfetchCustomersByIdQuery({variables: {ids: [PFcustomerID]}})

    if (data) {
        var {__typename, ...customer} = data.fetchCustomersPFById[0];
    }

    const TabPanel = (props: TabPanelProps) => {
        const { children, value, index, ...other } = props;
        return (
            <>
                {value === index && (
                    <Grid container hidden={value !== index} {...other}>
                        {children}
                    </Grid>
                )}
            </>
        ) 
    }


    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <AppBar>
                <Toolbar>
                    <Grid container justify='space-between' alignItems='center'>
                        <Typography variant="h6" color='secondary'>
                            Informações Adicionais - {data && data.fetchCustomersPFById[0].firstName} {data && data.fetchCustomersPFById[0].lastName}
                        </Typography>
                        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Toolbar>
            </AppBar>
            
            {data && customer && <DialogContent>
                <Grid container direction='row' justify='center' spacing={3} className={classes.extraInfoDialogContentRoot}>
                    <Grid item xs={4} container direction='column' justify='space-evenly' spacing={3}>
                        <Grid item><Edit customer={customer}/></Grid>
                    </Grid>
                    
                    <Divider orientation="vertical" flexItem />
                    
                    <Grid item xs={8} container direction='column' justify='flex-end' spacing={3}>
                    
                        <Grid item>
                            <Tabs 
                                value={tab}
                                onChange={(event, newValue) => setTab(newValue)}
                                indicatorColor="primary"
                                textColor="secondary"
                                variant="fullWidth">

                                <Tab label='Endereços' value='addresses'/>
                                <Tab label='Contatos' value='contacts'/>
                                {customer.hasDisability && <Tab label='Deficiências' value='disabilities'/>}
                                <Tab label='Histórico Profissional' value='professionalHistory'/>

                            </Tabs>
                        </Grid>
                        
                        <Grid item className={classes.tabPanel}>
                            <TabPanel value={tab} index={'addresses'}><h1>Addresses</h1></TabPanel>
                            <TabPanel value={tab} index={'contacts'}><h1>Contacts</h1></TabPanel>
                            {customer.hasDisability && <TabPanel value={tab} index={'disabilities'}><h1>Disabilities</h1></TabPanel>}
                            <TabPanel value={tab} index={'professionalHistory'}><h1>ProfessionalHistory</h1></TabPanel>
                        </Grid>

                    </Grid> 
                </Grid>    
            </DialogContent>}
            <Backdrop open={loading} style={{zIndex: 10}}>
				<CircularProgress size={75} color='secondary'/> 
			</Backdrop>
        </Dialog>
    );
}



// PF Customer Removal Confirmation Dialog
interface RemovalConfirmationDialogProps {
	open: boolean;
	onClose(): void;
	customers: {__typename?: string, id: string, firstName: string, lastName: string}[];
}

const RemovalConfirmationDialog: React.FC<RemovalConfirmationDialogProps> = (
	{open, onClose, customers}
) => {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

	const [removeSelectedCustomers, {data, loading, error}] = useRemoveCustomersMutation(
        {variables: {ids: customers.map(c => c.id)}}
    );

	if (data) {
        enqueueSnackbar(
            `Clientes removidos com sucesso !`,
            {variant: "success", preventDuplicate: true}
        );
		onClose();
    }
    
    if (error) {
        enqueueSnackbar(
            `Erro ao remover cliente.`,
            {variant: "error", preventDuplicate: true}
        );
        onClose();
    }

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Remover Clientes - PF</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Os Seguintes clientes serão removidos permanentemente do sistema.
					Tem certeza que deseja continuar ? 
				</DialogContentText>
					<List>
						{customers.map(customer => {
							return (
								<ListItem key={customer.id} dense>
									<ListItemIcon><LabelIcon /></ListItemIcon>
									<ListItemText id={customer.id} primary={`${customer.firstName} ${customer.lastName}`} />
								</ListItem>
							);
						})}
					</List>
			</DialogContent>
			<DialogActions>
				<Button color='primary' variant='contained' className={classes.button} onClick={() => removeSelectedCustomers()}>Deletar</Button>
				<Button color='primary' variant='contained' className={classes.button} onClick={onClose}>Cancelar</Button>
			</DialogActions>
			<Backdrop open={loading} style={{zIndex: 10}}>
				<CircularProgress size={75} color='secondary'/> 
			</Backdrop>
		</Dialog>        
	);
};


// PF Customer Connection Confirmation Dialog (Add/Remove Company)
interface ConnectionConfirmationDialogProps {
	open: boolean;
	onClose(): void;
    PFcustomers: {id: string, firstName: string, lastName: string}[];
    PJcustomers: {id: string, tradingName: string; legalName: string}[];
}

const ConnectionConfirmationDialog: React.FC<ConnectionConfirmationDialogProps> = (
	{open, onClose, PFcustomers, PJcustomers}
) => {

	const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [PJcustomer, setPJcustomer] = React.useState<string>('');
    const [isConnect, setIsConnect] = React.useState<boolean>(true);

    const [
        addCompany,
        {data: addCompanyData, loading: addCompanyLoading, error: addCompanyError}
    ] = usePFaddCompanyMutation({variables: {
        PJCustomerID: PJcustomer,
        PFCustomerIDS: PFcustomers.map(pfc => pfc.id),
        force: false
    }});

    const [
        removeCompany, 
        {data: removeCompanyData, loading: removeCompanyLoading, error: removeCompanyError}
    ] = usePFremoveCompanyMutation({variables: {
        PFCustomerIDS: PFcustomers.map(pfc => pfc.id),
    }})

	if (addCompanyData || removeCompanyData) {
        enqueueSnackbar(
            `Clientes ${!isConnect && 'des'}vinculados com sucesso !`,
            {variant: "success", preventDuplicate: true}
        );
		onClose();
    }

    if (addCompanyError || removeCompanyError) {
        enqueueSnackbar(
            `Erro ao ${!isConnect && 'des'}vincular cliente.`,
            {variant: "error", preventDuplicate: true}
        );
    }

    const toggleConnection = () => {
        setIsConnect(!isConnect);
    }

    const onSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (isConnect) {
            addCompany().catch(error => console.error(error.message));
        } else {
            removeCompany().catch(error => console.error(error.message));
        }
    }

	return (
		<Dialog open={open} onClose={onClose}>
			
                <Grid container direction='row' justify='space-between' alignItems='center'>
                    <Grid item>
                        <DialogTitle>
                            {isConnect ? 'Vincular' : 'Desvincular'} Clientes
                        </DialogTitle>
                    </Grid>
                    <Grid item>
                        <Button color='primary' variant='outlined'
                            className={classes.linkButton} onClick={toggleConnection}>
                                {isConnect ? 'Desvincular' : 'Vincular'}
                        </Button>
                    </Grid>
                </Grid>
            
			<DialogContent>
                {PJcustomer !== '' || !isConnect ? (
                    <>
                        {isConnect ? (
                            <DialogContentText>
                                <>Os seguintes clientes PF serão vinculados ao cliente PJ "<b>{`${
                                    PJcustomers.filter(pjc => pjc.id === PJcustomer)[0].tradingName
                                }`}</b>". Tem certeza que deseja continuar ?`</>
                            </DialogContentText>
                        ) : (
                            <DialogContentText>
                                Os seguintes clientes PF serão desvinculados do seu respectivo cliente PJ Tem certeza que deseja continuar ?
                            </DialogContentText>
                        )}
                        <List>
                            {PFcustomers.map(customer => {
                                return (
                                    <ListItem key={customer.id} dense>
                                        <ListItemIcon><LabelIcon /></ListItemIcon>
                                        <ListItemText id={customer.id} primary={`${customer.firstName} ${customer.lastName}`} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </>

                ) : (
                    <DialogContentText>Escolha um cliente PJ para ser vinculado !</DialogContentText>
                )}

                {isConnect && (<><br/>
                <TextField fullWidth select 
                    variant="outlined" label="Cliente PJ" 
                    value={PJcustomer} onChange={(e) => setPJcustomer(e.target.value)}>
                        {PJcustomers.map(customer => (
                            <MenuItem key={customer.id} value={customer.id}>{customer.tradingName}</MenuItem>
                        ))}
                </TextField>
                <br/></>)}

			</DialogContent>
			<DialogActions>
                {(PJcustomer !== '' || !isConnect ) &&
                    <Button color='primary' variant='contained'
                        className={classes.button}
                        onClick={onSave}>
                        Salvar
                    </Button>
                }
				<Button color='primary' variant='contained' className={classes.button} onClick={onClose}>Cancelar</Button>
			</DialogActions>
			<Backdrop open={addCompanyLoading || removeCompanyLoading} style={{zIndex: 10}}>
				<CircularProgress size={75} color='secondary'/> 
			</Backdrop>
		</Dialog>        
	);
};


// PF Page
interface PFPageProps {
    addModalOpen: boolean,
    setAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    removalDialogOpen: boolean,
    setRemovalDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    connectionDialogOpen: boolean,
    setConnectionDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    extraInfoDialogOpen: boolean;
    setExtraInfoDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    PFselected: string[],
    setPFselected: React.Dispatch<React.SetStateAction<string[]>>;
    isPF: boolean;
    setIsPF: React.Dispatch<React.SetStateAction<boolean>>;
    PFcustomers?: FetchPfCustomersNameQuery; 
    PJcustomers?: PJfetchCustomersQuery; 
};

export const PFPage: React.FC<PFPageProps> = ({
    addModalOpen, setAddModalOpen,
    removalDialogOpen, setRemovalDialogOpen,
    connectionDialogOpen, setConnectionDialogOpen,
    extraInfoDialogOpen, setExtraInfoDialogOpen,
    PFselected, setPFselected,
    isPF, setIsPF,
    PFcustomers,
    PJcustomers,  
}) => {
    
    // Hooks
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <Container className={classes.container}>
                <ExtendedTable title="Clientes PF" columns={[
                    {name: 'Nome', alignment: 'left', fetchedName: 'firstName', formatDate: false},
                    {name: 'Sobrenome', alignment: 'center', fetchedName: 'lastName', formatDate: false},
                    {name: 'CPF', alignment: 'center', fetchedName: 'CPF', formatDate: false},
                    {name: 'Criado Em', alignment: 'center', fetchedName: 'createdAt', formatDate: true},
                    {name: 'Atualizado Em', alignment: 'center', fetchedName: 'updatedAt', formatDate: true},
                ]} query={useFetchCustomersQuery} tabledProperty="fetchCustomers" rowCallback={(id) => history.push(`/customer/${id}`)}
                filterBy={['firstName', 'lastName', 'CPF']} rowsPerPage={6}
                selected={PFselected} setSelected={setPFselected} 
                extraComponents={[
                    <Button 
                        onClick={() => setIsPF(!isPF)} 
                        variant='outlined'
                        color='secondary'>
                            Trocar Tipo Pessoa
                    </Button>,
                ]}/>
            </Container>
            
            <ModalForm 
                title="Adicionar Cliente - PF"
                text={
                    <>Aqui você pode criar um novo <b>Cliente PF</b>, inserindo as informações mínimas para tal.
                    Após isso, você será levado ao <b>perfil do Cliente</b>, onde poderá adicionar outras informações.</>
                }
                variant="PFAdd"
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}/>
            
            {PFcustomers && removalDialogOpen && (
                <RemovalConfirmationDialog 
                    open={removalDialogOpen}
                    onClose={() => setRemovalDialogOpen(false)}
                    customers={PFcustomers.fetchCustomersPFById}/>
            )}

            {isPF && PJcustomers && PFcustomers && connectionDialogOpen && (
                <ConnectionConfirmationDialog 
                    open={connectionDialogOpen}
                    onClose={() => setConnectionDialogOpen(false)}
                    PFcustomers={PFcustomers.fetchCustomersPFById}
                    PJcustomers={PJcustomers.PJfetchCustomers}/>
            )}

            {extraInfoDialogOpen && PFselected.length === 1 && (
                <ExtraInfoDialog 
                    open={extraInfoDialogOpen}
                    onClose={() => setExtraInfoDialogOpen(false)}
                    PFcustomerID={PFselected[0]}
                />
            )}

        </>
    )

}