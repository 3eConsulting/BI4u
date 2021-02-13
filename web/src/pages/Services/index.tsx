import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import { SpeedDial, Action } from '../../components/SpeedDial';

import { 
	usePFfetchCustomersByIdLazyQuery,
	usePJfetchCustomersLazyQuery,
	usePJfetchCustomersByIdLazyQuery
} from '../../graphql/generated';

/* import { PFPage } from './PF';
import { PJPage } from './PJ'; */

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';

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
	

	// State
	const [speedDialOpen, setSpeedDialOpen] = React.useState<boolean>(false);
	const [isPF, setIsPF] = React.useState<boolean>(true);
	const [addModalOpen, setAddModalOpen] = React.useState<boolean>(false);
	const [removalDialogOpen, setRemovalDialogOpen] = React.useState<boolean>(false);
	const [connectionDialogOpen, setConnectionDialogOpen] = React.useState<boolean>(false);
	const [extraInfoDialogOpen, setExtraInfoDialogOpen] = React.useState<boolean>(false);
	const [selectedPF, setSelectedPF] = React.useState<string[]>([]);
	const [selectedPJ, setSelectedPJ] = React.useState<string[]>([]);

	// API
	const [
		PFfetchCustomers,
		{data: customersData}
	] = usePFfetchCustomersByIdLazyQuery({variables: {PFCustomerIDS: selectedPF}});

	const [PJfetchCustomer, {data: PJcustomersData}] = usePJfetchCustomersByIdLazyQuery({variables: {PJCustomerIDS: selectedPJ}})

	const [PJfetchAllcustomers, {data: PJallCustomersData}] = usePJfetchCustomersLazyQuery();

	// Methods
	const openAddModal = () => {
		setSpeedDialOpen(false);
		setAddModalOpen(true);
	}
	
	const openRemovalDialog = () => {
		isPF ? PFfetchCustomers() : PJfetchCustomer();
		setSpeedDialOpen(false);
		setRemovalDialogOpen(true);
	}

	const openConnectionDialog = () => {
		PFfetchCustomers();
		PJfetchAllcustomers();
		setSpeedDialOpen(false);
		setConnectionDialogOpen(true);
	}

	const openExtraInfoDialog = () => {
		setExtraInfoDialogOpen(true);
	}

	// Utilities
	const actions: Action[] = [
		{ 	title: 'Adicionar Cliente',
			icon: <AddIcon />,
			handler: openAddModal
		},
		{ 	title: 'Deletar Cliente',
			icon: <DeleteForeverIcon />,
			handler: openRemovalDialog,
			disabled: (isPF && selectedPF.length === 0) || (!isPF && selectedPJ.length === 0)
		},
		{ 	title: 'Editar Cliente',
			icon: <EditIcon />,
			handler: openExtraInfoDialog,
			disabled: (isPF && selectedPF.length !== 1) || (!isPF && selectedPJ.length !== 1)
		},
		{ 	title: 'Vincular Cliente',
			icon: <LinkIcon />,
			handler: openConnectionDialog,
			disabled: !isPF || selectedPF.length === 0
		},
	];

	return (
		<>
            <h1>Services Page</h1>
			{/* {isPF ? (
				<PFPage 
					isPF={isPF} setIsPF={setIsPF}
					addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen}
					removalDialogOpen={removalDialogOpen} setRemovalDialogOpen={setRemovalDialogOpen}
					PFselected={selectedPF} setPFselected={setSelectedPF}
					PFcustomers={customersData} PJcustomers={PJallCustomersData}
					connectionDialogOpen={connectionDialogOpen} setConnectionDialogOpen={setConnectionDialogOpen}
					extraInfoDialogOpen={extraInfoDialogOpen} setExtraInfoDialogOpen={setExtraInfoDialogOpen}/>
			) : (
				<PJPage 
					isPF={isPF} setIsPF={setIsPF}
					addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen}
					removalDialogOpen={removalDialogOpen} setRemovalDialogOpen={setRemovalDialogOpen}
					selected={selectedPJ} setSelected={setSelectedPJ}
					customers={PJcustomersData}/>
			)} */}

			<SpeedDial actions={actions} className={classes.speedDial} open={speedDialOpen} setOpen={setSpeedDialOpen}/>
		</>
	);
};
