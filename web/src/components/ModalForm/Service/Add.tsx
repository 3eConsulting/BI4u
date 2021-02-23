import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { yupLocale } from "../../../utilities/misc";

import { Grid, TextField, CircularProgress, Backdrop } from "@material-ui/core";

import { useAddServiceMutation } from "../../../graphql/generated";
import { useSnackbar } from "notistack";

interface AddProps {
	closeModal(): void;
}

// Validation Schema
const validationSchema = yup.object().shape({
	code: yup.string().length(6, yupLocale.string.messages.length).required(yupLocale.required),
	name: yup.string().max(150, yupLocale.string.messages.max).required(yupLocale.required),
	description: yup.string().required(yupLocale.required),
});

export const Add: React.FC<AddProps> = ({ closeModal }) => {
	// Hooks
	const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(validationSchema) });
	const { enqueueSnackbar } = useSnackbar();

	const [saveService, { loading }] = useAddServiceMutation();

	const createService = (data: any) => {
		saveService({ variables: data })
			.then((result) => {
				if (result.data) {
					enqueueSnackbar(`Serviço criado com sucesso ! [id: ${result.data.addService.id}]`, {
						variant: "success",
					});
					closeModal();
				}
			})
			.catch((err) => {
				console.error(err);
				enqueueSnackbar("Falha ao criar o Serviço ! Por favor, tente novamente !", { variant: "error" });
			});
	};

	const form = (
		<form id="ServiceAdd" onSubmit={handleSubmit((data) => createService(data))} autoComplete="false">
			<Grid container spacing={3}>
				<Grid item xs={3}>
					<TextField
						fullWidth
						autoFocus
						variant="outlined"
						name="code"
						error={!!errors.code}
						helperText={errors.code ? errors.code.message : ""}
						label="Código"
						inputRef={register}
					/>
				</Grid>
				<Grid item xs>
					<TextField
						fullWidth
						variant="outlined"
						name="name"
						error={!!errors.name}
						helperText={errors.name ? errors.name.message : ""}
						label="Nome"
						inputRef={register}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						multiline
						variant="outlined"
						rows={2}
						rowsMax={4}
						name="description"
						error={!!errors.description}
						helperText={errors.description ? errors.description.message : ""}
						label="Descrição"
						inputRef={register}
					/>
				</Grid>
			</Grid>
		</form>
	);

	return (
		<>
			{form}
			{loading && (
				<Backdrop open={true} style={{ zIndex: 10 }}>
					<CircularProgress size={75} color="secondary" />
				</Backdrop>
			)}
		</>
	);
};
