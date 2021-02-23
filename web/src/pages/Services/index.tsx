import React from "react";

import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import {
	useFetchServicesByIdLazyQuery,
	useFetchServicesQuery,
	Service,
	useRemoveServicesMutation,
} from "../../graphql/generated";

import { ModalForm } from "../../components/ModalForm";
import { SpeedDial, Action } from "../../components/SpeedDial";
import { ExtendedTable } from "../../components/Table";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import LabelIcon from "@material-ui/icons/Label";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DialogActions from "@material-ui/core/DialogActions";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {},
		container: {
			marginTop: "5%",
		},
		speedDial: {
			position: "absolute",
			bottom: theme.spacing(3),
			left: theme.spacing(3),
		},
		button: {
			color: theme.palette.common.white,
		},
	})
);

// Service Removal Confirmation Dialog
interface RemovalConfirmationDialogProps {
	open: boolean;
	onClose(): void;
	services: Service[];
	selected: string[];
	setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const RemovalConfirmationDialog: React.FC<RemovalConfirmationDialogProps> = ({
	open,
	onClose,
	services,
	selected,
	setSelected,
}) => {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();

	const [removeSelectedServices, { data, loading, error }] = useRemoveServicesMutation({
		variables: { ServiceIDS: services.map((service) => service.id) },
	});

	if (data) {
		let removedIDS = services.map((c) => c.id);
		let newSelection = selected.filter((s) => removedIDS.indexOf(s) === -1);
		setSelected(newSelection);

		enqueueSnackbar(`Serviços removidos com sucesso !`, { variant: "success", preventDuplicate: true });
		onClose();
	}

	if (error) {
		enqueueSnackbar(`Erro ao remover serviços.`, { variant: "error", preventDuplicate: true });
		onClose();
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Remover Serviços</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Os Seguintes serviços serão removidos permanentemente do sistema. Tem certeza que deseja continuar ?
				</DialogContentText>
				<List>
					{services.map((service) => {
						return (
							<ListItem key={service.id} dense>
								<ListItemIcon>
									<LabelIcon />
								</ListItemIcon>
								<ListItemText id={service.id} primary={`${service.code} - ${service.name}`} />
							</ListItem>
						);
					})}
				</List>
			</DialogContent>
			<DialogActions>
				<Button
					color="primary"
					variant="contained"
					className={classes.button}
					onClick={() => removeSelectedServices()}>
					Deletar
				</Button>
				<Button color="primary" variant="contained" className={classes.button} onClick={onClose}>
					Cancelar
				</Button>
			</DialogActions>
			<Backdrop open={loading} style={{ zIndex: 10 }}>
				<CircularProgress size={75} color="secondary" />
			</Backdrop>
		</Dialog>
	);
};

export const ServicesPage: React.FC = () => {
	// Hooks
	const classes = useStyles();
	const history = useHistory();

	// State
	const [speedDialOpen, setSpeedDialOpen] = React.useState<boolean>(false);
	const [addModalOpen, setAddModalOpen] = React.useState<boolean>(false);
	const [removalDialogOpen, setRemovalDialogOpen] = React.useState<boolean>(false);
	const [selectedServices, setSelectedServices] = React.useState<string[]>([]);

	// APIS
	const [fetchServices, { data: servicesData }] = useFetchServicesByIdLazyQuery({
		variables: { ids: selectedServices },
	});

	// Methods
	const openAddModal = () => {
		setSpeedDialOpen(false);
		setAddModalOpen(true);
	};

	const openRemovalDialog = () => {
		fetchServices();
		setSpeedDialOpen(false);
		setRemovalDialogOpen(true);
	};

	// Utilities
	const actions: Action[] = [
		{ title: "Adicionar Serviço", icon: <AddIcon />, handler: openAddModal },
		{
			title: "Deletar Serviços",
			icon: <DeleteForeverIcon />,
			handler: openRemovalDialog,
			disabled: selectedServices.length === 0,
		},
	];

	return (
		<>
			{servicesData && removalDialogOpen && (
				<RemovalConfirmationDialog
					open={removalDialogOpen}
					onClose={() => setRemovalDialogOpen(false)}
					services={servicesData.fetchServicesById}
					selected={selectedServices}
					setSelected={setSelectedServices}
				/>
			)}

			<ModalForm
				title="Adicionar Serviço"
				variant="ServiceAdd"
				open={addModalOpen}
				onClose={() => setAddModalOpen(false)}
			/>

			<Container className={classes.container}>
				<ExtendedTable
					title="Serviços"
					columns={[
						{ name: "Código", alignment: "left", fetchedName: "code", formatDate: false },
						{ name: "Nome", alignment: "center", fetchedName: "name", formatDate: false },
						{ name: "Criado Em", alignment: "center", fetchedName: "createdAt", formatDate: true },
						{ name: "Atualizado Em", alignment: "center", fetchedName: "updatedAt", formatDate: true },
					]}
					query={useFetchServicesQuery}
					tabledProperty="fetchServices"
					rowCallback={(id) => history.push(`/services/${id}`)}
					filterBy={["code", "name"]}
					rowsPerPage={6}
					selected={selectedServices}
					setSelected={setSelectedServices}
				/>
			</Container>

			<SpeedDial
				actions={actions}
				className={classes.speedDial}
				open={speedDialOpen}
				setOpen={setSpeedDialOpen}
			/>
		</>
	);
};
