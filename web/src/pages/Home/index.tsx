import React from 'react';

import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import TodayIcon from '@material-ui/icons/Today';
import NotesIcon from '@material-ui/icons/Notes';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { HomeButton, iHomeButtonProps } from '../../components/HomeButton';
import { HomeSchedule } from '../../components/HomeSchedule';
import { HomeChart } from '../../components/HomeChart';
import Copyright from '../../components/Copyright';

import { useHistory } from 'react-router-dom';
import { authFunctionalities, eRole } from '../../utilities/authentication';
import { CurrentBalance } from '../../components/CurrentBalance';

export const HomePage: React.FC = () => {
	const history = useHistory();

	const isAdmin: boolean = authFunctionalities.getRole() === eRole.ADMIN;

	const HomeButtons: iHomeButtonProps[] = [
		{ startIcon: <TodayIcon />, title: 'Agendamento', variant: 'contained', color: 'secondary' },
		{
			startIcon: <EmojiPeopleIcon />,
			title: 'Clientes',
			variant: 'contained',
			color: 'secondary',
			onClick: () => history.push('/customers'),
		},
		{ startIcon: <MonetizationOnTwoToneIcon />, title: 'Financeiro', variant: 'contained', color: 'secondary' },
		{ startIcon: <NotesIcon />, title: 'Prontuario', variant: 'contained', color: 'secondary' },
		{ startIcon: <TrendingUpIcon />, title: 'Relatorios', variant: 'contained', color: 'secondary' },
		{ startIcon: <LocalHospitalIcon />, title: 'Serviços', variant: 'contained', color: 'secondary' },
	];

	return (
		<Box height='90vh'>
			<Grid container direction='column' justify='space-evenly' alignItems='center' style={{ height: '100%' }}>
				{isAdmin ? (
					<Grid item container justify='space-evenly'>
						<Grid item md={7}>
							<HomeSchedule paperStyle={{ height: '50vh', padding: 10 }} isAdmin={isAdmin} />
						</Grid>
						<Grid item md={4} container direction='column' justify='space-between' spacing={2}>
							<Grid item>
								<CurrentBalance balance={1050} />
							</Grid>
							<Grid item>
								<HomeChart />
							</Grid>
						</Grid>
					</Grid>
				) : (
					<Grid item>
						<HomeSchedule
							paperStyle={{ height: '50vh', width: '90%', marginLeft: '5%', padding: 10 }}
							isAdmin={isAdmin}
						/>
					</Grid>
				)}

				<Grid item container direction='row' justify='space-evenly'>
					{HomeButtons.map((hb, i) => {
						if (i < 3) {
							return (
								<Grid item key={i.toString()}>
									<HomeButton size='large' {...hb} />
								</Grid>
							);
						} else {
							return '';
						}
					})}
				</Grid>
				<Grid item container direction='row' justify='space-evenly'>
					{HomeButtons.map((hb, i) => {
						if (i > 2) {
							return (
								<Grid item key={i.toString()}>
									<HomeButton size='large' {...hb} />
								</Grid>
							);
						} else {
							return '';
						}
					})}
				</Grid>
				<Grid item>
					<Copyright />
				</Grid>
			</Grid>
		</Box>
	);
};
