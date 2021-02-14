import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import { SpeedDial, Action } from '../../components/SpeedDial';
import { ExtendedTable } from '../../components/Table';

import { 
	usePFfetchCustomersByIdLazyQuery,
	usePJfetchCustomersLazyQuery,
	usePJfetchCustomersByIdLazyQuery,
	usePFfetchCustomersQuery
} from '../../graphql/generated';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import Container from '@material-ui/core/Container';

import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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



export const ServicesPage: React.FC = () => {
	// Hooks
	const classes = useStyles();
	const history = useHistory();

	// State
	const [speedDialOpen, setSpeedDialOpen] = React.useState<boolean>(false);
	const [isPF, setIsPF] = React.useState<boolean>(true);
	const [addModalOpen, setAddModalOpen] = React.useState<boolean>(false);
	const [removalDialogOpen, setRemovalDialogOpen] = React.useState<boolean>(false);
	const [connectionDialogOpen, setConnectionDialogOpen] = React.useState<boolean>(false);
	const [extraInfoDialogOpen, setExtraInfoDialogOpen] = React.useState<boolean>(false);
	const [selectedServices, setSelectedServices] = React.useState<string[]>([]);

	// API
	const [
		PFfetchCustomers,
		{data: customersData}
	] = usePFfetchCustomersByIdLazyQuery({variables: {PFCustomerIDS: selectedServices}});

	// Methods
	const openAddModal = () => {
		setSpeedDialOpen(false);
		setAddModalOpen(true);
	}
	
	const openRemovalDialog = () => {
		PFfetchCustomers();
		setSpeedDialOpen(false);
		setRemovalDialogOpen(true);
	}

	const openExtraInfoDialog = () => {
		setExtraInfoDialogOpen(true);
	}

	// Utilities
	const actions: Action[] = [
		{ 	title: 'Adicionar Serviço',
			icon: <AddIcon />,
			handler: openAddModal
		},
		{ 	title: 'Deletar Serviços',
			icon: <DeleteForeverIcon />,
			handler: openRemovalDialog,
			disabled: (selectedServices.length === 0)
		},
		{ 	title: 'Editar Serviço',
			icon: <EditIcon />,
			handler: openExtraInfoDialog,
			disabled: (selectedServices.length !== 1)
		},
	];

	return (
		<>			
			<Container className={classes.container}>
                <ExtendedTable title="Serviços" columns={[
                    { name: 'Nome', alignment: 'left', fetchedName: 'firstName', formatDate: false },
                    { name: 'Sobrenome', alignment: 'center', fetchedName: 'lastName', formatDate: false },
                    { name: 'CPF', alignment: 'center', fetchedName: 'CPF', formatDate: false },
                    { name: 'Criado Em', alignment: 'center', fetchedName: 'createdAt', formatDate: true },
                    { name: 'Atualizado Em', alignment: 'center', fetchedName: 'updatedAt', formatDate: true },
                ]} query={usePFfetchCustomersQuery} tabledProperty="PFfetchCustomers" rowCallback={(id) => history.push(`/services/${id}`)}
                    filterBy={['firstName', 'lastName', 'CPF']} rowsPerPage={6}
                    selected={selectedServices} setSelected={setSelectedServices} />
            </Container>


			<SpeedDial actions={actions} className={classes.speedDial} open={speedDialOpen} setOpen={setSpeedDialOpen}/>
		</>
	);
};
