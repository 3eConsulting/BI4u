import React from "react";

import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { yupLocale } from "../../utilities/misc";

import { useFetchServiceByIdQuery, useUpdateServicesMutation } from "../../graphql/generated";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { InputAdornment } from "@material-ui/core";

import { Redirect, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Cleave from "cleave.js/react";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			marginTop: theme.spacing(4),
		},
		extraInfoDialogContentRoot: {
			overflowY: "hidden",
		},
		headingText: {
			fontWeight: "bold",
			marginBottom: theme.spacing(3),
		},
		subHeadingText: {
			color: theme.palette.text.disabled,
			fontWeight: "bold",
			padding: 0,
			margin: 0,
		},
		tabPanel: {
			height: "75vh",
			overflowY: "auto",
			overflowX: "hidden",
		},
		tabIndicator: {
			backgroundColor: theme.palette.primary.main,
		},
		actionRow: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
		button: {
			color: theme.palette.common.white,
		},
	})
);

// Validation Schema
const validationSchema = yup.object().shape({
	code: yup.string().length(6, yupLocale.string.messages.length).required(yupLocale.required),
	name: yup.string().max(150, yupLocale.string.messages.max).required(yupLocale.required),
	description: yup.string().required(yupLocale.required),
});

// PF Customer Extra Info Dialog
interface ServiceDetailPageProps {}

const CleaveTextField = ({ inputRef, options, ...otherProps }: any) => (
	<Cleave {...otherProps} htmlRef={inputRef} options={options} />
);

const CurrencyTextField = (props: TextFieldProps) => {
	const { defaultValue, ...restOfProps } = props;

	const [value, setValue] = React.useState(defaultValue ? defaultValue : "");

	React.useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
		}
	}, [defaultValue]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let v = event.target.value.replaceAll(".", "");

		if (v.match(/^(\d+)(.\d{2})?$/)) {
			if (v.length > 2) {
				v = `${v.substr(0, v.length - 2)}.${v.substr(v.length - 2)}`;
			}
			setValue(v);
		} else if (v === "") {
			setValue(v);
		}
	};

	if (value !== "") {
		return (
			<TextField
				value={value}
				onChange={handleChange}
				InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
				{...restOfProps}
			/>
		);
	} else {
		return <TextField value={value} onChange={handleChange} {...restOfProps} />;
	}
};

export default function SliderInput(props: { label: string; name: string; watch: any; setValue: any }) {
	const { label, name, watch, setValue } = props;

	let value = watch(name);

	const handleSliderChange = (event: any, newValue: number | number[]) => {
		setValue(name, newValue);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(name, event.target.value === "" ? "" : Number(event.target.value));
	};

	const handleBlur = () => {
		if (value < 0) {
			setValue(name, 0);
		} else if (value > 100) {
			setValue(name, 100);
		}
	};

	return (
		<div>
			<Typography id="input-slider" gutterBottom>
				{label}
			</Typography>
			<Grid container spacing={2} alignItems="center" alignContent="center">
				<Grid item xs>
					<Slider
						value={typeof value === "number" ? value : 0}
						onChange={handleSliderChange}
						aria-labelledby="input-slider"
					/>
				</Grid>
				<Grid item>
					<TextField
						variant="outlined"
						value={value}
						margin="dense"
						onChange={handleInputChange}
						onBlur={handleBlur}
						inputProps={{
							step: 10,
							min: 0,
							max: 100,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
						InputProps={{
							endAdornment: <InputAdornment position="end">%</InputAdornment>,
						}}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = () => {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const { serviceID } = useParams<{ serviceID: string }>();

	const [editable, setEditable] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const { data: fetchData, loading: fetchLoading, error: fetchError, refetch } = useFetchServiceByIdQuery({
		variables: { id: serviceID },
	});
	const [updateService] = useUpdateServicesMutation();

	const { handleSubmit, errors, control, register, reset } = useForm({
		resolver: yupResolver(validationSchema),
	});

	// TODO: Better Handle Fetch Error
	if (fetchError) {
		console.error(fetchError);
		enqueueSnackbar("Serviço Não Encontrado !", { variant: "error" });
		return <Redirect to="/services" />;
	}

	if (fetchData) {
		var { __typename, ...service } = fetchData.fetchServiceById;
	}

	const handleSave = async (formData: any) => {
		try {
			setLoading(true);

			let updateResponse = await updateService({
				variables: {
					ServiceID: serviceID,
					makeCalculations: false,
					associatedSaleValue: formData.associatedSaleValue ? parseFloat(formData.associatedSaleValue) : null,
					baseCost: formData.baseCost ? parseFloat(formData.baseCost) : null,
					baseSaleValue: formData.baseSaleValue ? parseFloat(formData.baseSaleValue) : null,
					deliveryTime: formData.deliveryTime ? parseInt(formData.deliveryTime) : null,
					fixedRentability: formData.fixedRentability ? parseFloat(formData.fixedRentability) : null,
					percentualRentability: formData.percentualRentability
						? parseFloat(formData.percentualRentability) / 100
						: null,
					fixedAssociatedDiscount: formData.fixedAssociatedDiscount
						? parseFloat(formData.fixedAssociatedDiscount)
						: null,
					percentualAssociatedDiscount: formData.percentualAssociatedDiscount
						? parseFloat(formData.percentualAssociatedDiscount) / 100
						: null,
				},
			});

			if (updateResponse.data) enqueueSnackbar("Serviço Atualizado com Sucesso !", { variant: "success" });

			await refetch();
			setLoading(false);
			setEditable(false);
		} catch (err) {
			console.error(err);
			setLoading(false);
			enqueueSnackbar("Erro ao Salvar o Serviço. Tente Novamente em Alguns Minutos.", { variant: "error" });
		}
	};

	const handleSaveAndCalculate = async (formData: any) => {
		try {
			setLoading(true);

			let updateResponse = await updateService({
				variables: {
					ServiceID: serviceID,
					makeCalculations: true,
					associatedSaleValue: formData.associatedSaleValue ? parseFloat(formData.associatedSaleValue) : null,
					baseCost: formData.baseCost ? parseFloat(formData.baseCost) : null,
					baseSaleValue: formData.baseSaleValue ? parseFloat(formData.baseSaleValue) : null,
					deliveryTime: formData.deliveryTime ? parseInt(formData.deliveryTime) : null,
					fixedRentability: formData.fixedRentability ? parseFloat(formData.fixedRentability) : 0,
					percentualRentability: formData.percentualRentability
						? parseFloat(formData.percentualRentability) / 100
						: 0,
					fixedAssociatedDiscount: formData.fixedAssociatedDiscount
						? parseFloat(formData.fixedAssociatedDiscount)
						: 0,
					percentualAssociatedDiscount: formData.percentualAssociatedDiscount
						? parseFloat(formData.percentualAssociatedDiscount) / 100
						: 0,
				},
			});

			if (updateResponse.data) {
				enqueueSnackbar("Serviço Atualizado com Sucesso !", { variant: "success" });
				console.log(updateResponse.data.updateService);
				/* setValue(
					"baseSaleValue",
					updateResponse.data.updateService.baseSaleValue
						? (updateResponse.data.updateService.baseSaleValue.toFixed(2) as any)
						: ("" as any)
				);
				setValue(
					"associatedSaleValue",
					updateResponse.data.updateService.associatedSaleValue
						? (updateResponse.data.updateService.associatedSaleValue.toFixed(2) as any)
						: ("" as any)
				); */
			}

			setLoading(false);
			setEditable(false);
		} catch (err) {
			console.error(err);
			setLoading(false);
			enqueueSnackbar("Erro ao Salvar o Serviço. Tente Novamente em Alguns Minutos.", { variant: "error" });
		}
	};

	return (
		<Container className={classes.root}>
			{service && (
				<form id="PFCustomer" className={classes.root} autoComplete="false">
					<Grid container direction="row" spacing={3} justify="space-between">
						<Grid item>
							<h2 className={classes.headingText}>
								{service.code}
								<br />
								<small className={classes.subHeadingText}>{service.name}</small>
							</h2>
						</Grid>
						<Grid item>
							{!editable ? (
								<Grid item>
									<Tooltip title="Editar" placement="top" arrow>
										<IconButton onClick={() => setEditable(true)}>
											<EditIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title="Excluir" placement="top" arrow>
										<IconButton onClick={() => console.log("remove")}>
											<DeleteForeverIcon />
										</IconButton>
									</Tooltip>
								</Grid>
							) : (
								<Grid item>
									<Tooltip title="Cancelar" placement="top" arrow>
										<IconButton
											onClick={() => {
												setEditable(false);
												reset();
											}}>
											<CloseIcon />
										</IconButton>
									</Tooltip>
								</Grid>
							)}
						</Grid>
					</Grid>

					<Grid container direction="column" spacing={3}>
						<Grid item container direction="row" spacing={3}>
							<Grid item lg={2}>
								<TextField
									fullWidth
									variant="outlined"
									defaultValue={service.code ? service.code : ""}
									name="code"
									error={!!errors.code}
									helperText={errors.code ? errors.code.message : ""}
									label="Código"
									inputProps={{
										readOnly: !editable,
									}}
									inputRef={register}
								/>
							</Grid>
							<Grid item lg={10}>
								<TextField
									fullWidth
									variant="outlined"
									defaultValue={service.name ? service.name : ""}
									name="name"
									error={!!errors.name}
									helperText={errors.name ? errors.name.message : ""}
									label="Nome"
									inputProps={{
										readOnly: !editable,
									}}
									inputRef={register}
								/>
							</Grid>
						</Grid>

						<Grid item container direction="row" spacing={3}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									multiline
									variant="outlined"
									rows={2}
									rowsMax={4}
									defaultValue={service.description ? service.description : ""}
									name="description"
									error={!!errors.description}
									helperText={errors.description ? errors.description.message : ""}
									label="Descrição"
									inputProps={{
										readOnly: !editable,
									}}
									inputRef={register}
								/>
							</Grid>
						</Grid>

						<Grid item container direction="row">
							<Grid item>
								<h2 className={classes.subHeadingText}>
									<small>Informações e Valores</small>
								</h2>
							</Grid>
						</Grid>

						<Divider />

						<Grid item container direction="row" spacing={3}>
							<Grid item xs={3}>
								<Controller
									name="deliveryTime"
									control={control}
									defaultValue={service && service.deliveryTime ? service.deliveryTime : null}
									render={(props) => (
										<TextField
											fullWidth
											variant="outlined"
											{...props}
											label="Tempo de Entrega"
											error={!!errors.deliveryTime}
											helperText={errors.deliveryTime ? errors.deliveryTime.message : ""}
											inputProps={{
												readOnly: !editable,
												options: {
													blocks: [5],
													numericOnly: true,
												},
											}}
											InputProps={{
												inputComponent: CleaveTextField,
												endAdornment: <InputAdornment position="end">Horas</InputAdornment>,
											}}
										/>
									)}
								/>
							</Grid>

							<Grid item xs={3}>
								<CurrencyTextField
									fullWidth
									variant="outlined"
									defaultValue={service.baseCost ? service.baseCost : null}
									name="baseCost"
									error={!!errors.baseCost}
									helperText={errors.baseCost ? errors.baseCost.message : ""}
									label="Valor de Custo"
									inputProps={{
										readOnly: !editable,
									}}
									inputRef={register}
								/>
							</Grid>

							<Grid item xs={3}>
								<CurrencyTextField
									fullWidth
									variant="outlined"
									defaultValue={service.baseSaleValue ? service.baseSaleValue : null}
									name="baseSaleValue"
									error={!!errors.baseSaleValue}
									helperText={errors.baseSaleValue ? errors.baseSaleValue.message : ""}
									label="Valor de Venda Padrão"
									inputProps={{
										readOnly: !editable,
									}}
									inputRef={register}
								/>
							</Grid>

							<Grid item xs={3}>
								<CurrencyTextField
									fullWidth
									variant="outlined"
									defaultValue={service.associatedSaleValue ? service.associatedSaleValue : null}
									name="associatedSaleValue"
									error={!!errors.associatedSaleValue}
									helperText={errors.associatedSaleValue ? errors.associatedSaleValue.message : ""}
									label="Valor de Venda Para Associado"
									inputProps={{
										readOnly: !editable,
									}}
									inputRef={register}
								/>
							</Grid>
						</Grid>

						<Grid item container direction="row">
							<Grid item>
								<h2 className={classes.subHeadingText}>
									<small>Descontos e Rendimentos</small>
								</h2>
							</Grid>
						</Grid>

						<Divider />

						<Grid item container direction="row" spacing={3}>
							<Grid item container direction="row" alignItems="center" spacing={3}>
								<Grid item xs={3}>
									<CurrencyTextField
										fullWidth
										variant="outlined"
										defaultValue={service.fixedRentability ? service.fixedRentability : null}
										name="fixedRentability"
										error={!!errors.fixedRentability}
										helperText={errors.fixedRentability ? errors.fixedRentability.message : ""}
										label="Rentabilidade Fixa"
										inputProps={{
											readOnly: !editable,
										}}
										inputRef={register}
									/>
								</Grid>

								<Grid item xs={1}></Grid>

								<Grid item xs={4}>
									<Typography>Rentabilidade Percentual</Typography>

									<Controller
										fullWidth
										name="percentualRentability"
										control={control}
										defaultValue={
											service.percentualRentability ? service.percentualRentability * 100 : 0
										}
										error={!!errors.percentualRentability}
										helperText={
											errors.percentualRentability ? errors.percentualRentability.message : ""
										}
										render={(props) => (
											<Slider
												disabled={!editable}
												{...props}
												onChange={(_, value) => {
													props.onChange(value);
												}}
												valueLabelDisplay="auto"
												valueLabelFormat={(value) => `${value}%`}
												max={100}
												step={1}
											/>
										)}
									/>
								</Grid>

								<Grid item xs={1}></Grid>

								<Grid item xs={3}>
									<Button
										fullWidth
										onClick={() => handleSubmit((data) => handleSave(data))()}
										color="primary"
										variant="contained"
										className={classes.button}
										disabled={!editable}>
										Salvar
									</Button>
								</Grid>
							</Grid>
							<Grid item container direction="row" alignItems="center" spacing={3}>
								<Grid item xs={3}>
									<CurrencyTextField
										fullWidth
										variant="outlined"
										defaultValue={
											service.fixedAssociatedDiscount ? service.fixedAssociatedDiscount : null
										}
										name="fixedAssociatedDiscount"
										error={!!errors.fixedAssociatedDiscount}
										helperText={
											errors.fixedAssociatedDiscount ? errors.fixedAssociatedDiscount.message : ""
										}
										label="Desconto Fixo Para Associados"
										inputProps={{
											readOnly: !editable,
										}}
										inputRef={register}
									/>
								</Grid>

								<Grid item xs={1}></Grid>

								<Grid item xs={4}>
									<Typography>Desconto Percentual Para Associados</Typography>

									<Controller
										fullWidth
										name="percentualAssociatedDiscount"
										control={control}
										defaultValue={
											service.percentualAssociatedDiscount
												? service.percentualAssociatedDiscount * 100
												: 0
										}
										error={!!errors.percentualAssociatedDiscount}
										helperText={
											errors.percentualAssociatedDiscount
												? errors.percentualAssociatedDiscount.message
												: ""
										}
										render={(props) => (
											<Slider
												disabled={!editable}
												{...props}
												onChange={(_, value) => {
													props.onChange(value);
												}}
												valueLabelDisplay="auto"
												valueLabelFormat={(value) => `${value}%`}
												max={100}
												step={1}
											/>
										)}
									/>
								</Grid>

								<Grid item xs={1}></Grid>

								<Grid item xs={3}>
									<Button
										fullWidth
										onClick={() => handleSubmit((data) => handleSaveAndCalculate(data))()}
										color="primary"
										variant="contained"
										className={classes.button}
										disabled={!editable}>
										Calcular e Salvar
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</form>
			)}

			<Backdrop open={loading || fetchLoading} style={{ zIndex: 10 }}>
				<CircularProgress size={75} color="secondary" />
			</Backdrop>
		</Container>
	);
};
