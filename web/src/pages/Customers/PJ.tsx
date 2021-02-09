import React from "react"

import { useHistory } from "react-router-dom";

import { ExtendedTable } from '../../components/Table';
import { ModalForm } from '../../components/ModalForm';

import { 
    PJfetchCustomersByIdQuery,
    usePJfetchCustomersQuery,
    usePJremoveCustomersMutation,
} from "../../graphql/generated";

import { useSnackbar } from 'notistack';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import LabelIcon from '@material-ui/icons/Label';
import ListItemText from "@material-ui/core/ListItemText";
import DialogActions from "@material-ui/core/DialogActions";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

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
		}
	})
);

interface RemovalConfirmationDialogProps {
	open: boolean;
	onClose(): void;
	customers: ({
        __typename?: 'PFCustomer', id: string, firstName: string, lastName: string
    } | {
        __typename?: 'PJCustomer', id: string, tradingName: string, legalName: string
    })[];
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const RemovalConfirmationDialog: React.FC<RemovalConfirmationDialogProps> = (
	{open, onClose, customers, selected, setSelected}
) => {

	const classes = useStyles();

    const {enqueueSnackbar} = useSnackbar();

	const [removeSelectedCustomers, {data, loading, error}] = usePJremoveCustomersMutation(
        {variables: {PJCustomerIDS: customers.map(c => c.id)}}
    );

	if (data) {
		let removedIDS = customers.map(c => c.id)
        let newSelection = selected.filter(s => removedIDS.indexOf(s) === -1);
        setSelected(newSelection);

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
		<Dialog open={open} onClose={onClose} keepMounted={false}>
			<DialogTitle>Remover Clientes - PJ</DialogTitle>
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
                                    {customer.__typename === 'PFCustomer' && (
                                        <ListItemText 
                                        id={customer.id}
                                        primary={`${customer.firstName} ${customer.lastName}`} />
                                    )}
                                    {customer.__typename === 'PJCustomer' && (
                                        <ListItemText 
                                        id={customer.id}
                                        primary={`${customer.tradingName}`} />
                                    )}
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

interface PJPageProps {
    addModalOpen: boolean,
    setAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    removalDialogOpen: boolean,
    setRemovalDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    isPF: boolean;
    setIsPF: React.Dispatch<React.SetStateAction<boolean>>;
    customers?: PJfetchCustomersByIdQuery; 
};

export const PJPage: React.FC<PJPageProps> = ({
    addModalOpen, removalDialogOpen, selected, customers, isPF,
    setAddModalOpen, setRemovalDialogOpen, setSelected, setIsPF,
}) => {
    
    // Hooks
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <Container className={classes.container}>
                <ExtendedTable title="Clientes PJ" columns={[
                    {name: 'Nome Fantasia', alignment: 'left', fetchedName: 'tradingName', formatDate: false},
                    {name: 'Razão Social', alignment: 'center', fetchedName: 'legalName', formatDate: false},
                    {name: 'CNPJ', alignment: 'center', fetchedName: 'CNPJ', formatDate: false},
                    {name: 'Criado Em', alignment: 'center', fetchedName: 'createdAt', formatDate: true},
                    {name: 'Atualizado Em', alignment: 'center', fetchedName: 'updatedAt', formatDate: true},
                ]} query={usePJfetchCustomersQuery} tabledProperty="PJfetchCustomers" rowCallback={(id) => history.push(`/customers/PJ/${id}`)}
                filterBy={['tradingName', 'legalName', 'CNPJ']} rowsPerPage={6}
                selected={selected} setSelected={setSelected} 
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
                title="Adicionar Cliente - PJ"
                text={
                    <>Aqui você pode criar um novo <b>Cliente PJ</b>, inserindo as informações mínimas para tal.
                    Após isso, você será levado ao <b>perfil do Cliente</b>, onde poderá adicionar outras informações.</>
                }
                variant="PJAdd"
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}/>
            
            {customers && (
                <RemovalConfirmationDialog 
                    open={removalDialogOpen}
                    onClose={() => setRemovalDialogOpen(false)}
                    customers={customers.PJfetchCustomersById}
                    selected={selected} setSelected={setSelected}/>
            )}
        </>
    )

}