import React from 'react';
import Copyright from '../../components/Copyright';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { authFunctionalities } from '../../utilities/authentication';
import { useSnackbar } from 'notistack';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const errorMessage = 'Não conseguimos te autenticar. 🙁 Verifique suas credenciais e tente novamente !';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(12),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	backdrop: {
		zIndex: 10,
	},
}));

export const LoginPage = () => {
	const classes = useStyles();
	const history = useHistory();
	const { enqueueSnackbar } = useSnackbar();

	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	const passwordRef = React.useRef<HTMLDivElement>(null);
	const submitRef = React.useRef<HTMLButtonElement>(null);

	const signIn = async () => {
		setLoading(true);

		const loggedIn = await authFunctionalities.signIn(username, password);

		if (loggedIn) {
			history.replace('/');
		} else {
			enqueueSnackbar(errorMessage, {
				variant: 'error',
			});
			setLoading(false);
		}
	};

	const submitOnEnter = async (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' && submitRef.current) {
			event.preventDefault();
			submitRef.current.click();
		}
	};

	const focusPasswordOnEnter = async (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' && passwordRef.current) {
			event.preventDefault();
			passwordRef.current.focus();
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Backdrop open={loading} className={classes.backdrop}>
				<CircularProgress size={75} color='secondary' />
			</Backdrop>

			<Box className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign In
				</Typography>
				<div className={classes.form}>
					<TextField
						required
						fullWidth
						autoFocus
						value={username}
						onChange={(event) => setUsername(event.target.value)}
						onKeyPress={focusPasswordOnEnter}
						variant='outlined'
						margin='normal'
						id='username'
						label='Nome de Usuário'
						name='username'
						autoComplete='username'
					/>
					<TextField
						required
						fullWidth
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						onKeyPress={submitOnEnter}
						inputRef={passwordRef}
						variant='outlined'
						margin='normal'
						name='password'
						label='Senha'
						type='password'
						id='password'
						autoComplete='current-password'
					/>
					<Button
						fullWidth
						onClick={signIn}
						ref={submitRef}
						type='button'
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Entrar
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link href='#' variant='body2'>
								Esqueceu a Senha ?
							</Link>
						</Grid>
					</Grid>
				</div>
			</Box>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};
