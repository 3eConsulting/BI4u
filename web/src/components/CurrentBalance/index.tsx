import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { localeCurrency } from '../../utilities/misc';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: theme.spacing(1),
		},
	})
);

export interface CurrentBalanceProps {
	balance: number;
}

export const CurrentBalance: React.FC<CurrentBalanceProps> = ({ balance }) => {
	const classes = useStyles();

	const [currencyVisibility, setCurrencyVisibility] = React.useState(false);

	const toggleCurrencyVisibility = () => {
		setCurrencyVisibility(!currencyVisibility);
	};

	return (
		<Paper className={classes.root}>
			<Grid container direction='row' justify='space-evenly' alignItems='center'>
				<Grid item>
					<Typography variant='h6'>Balanço Atual</Typography>
				</Grid>
				<Grid item>
					<Zoom in={currencyVisibility}>
						<Typography variant='h6'>{localeCurrency(balance)}</Typography>
					</Zoom>
				</Grid>
				<Grid item>
					<IconButton onClick={toggleCurrencyVisibility}>
						{currencyVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
					</IconButton>
				</Grid>
			</Grid>
		</Paper>
	);
};
