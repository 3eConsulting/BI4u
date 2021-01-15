import React from 'react';
import { AppointmentModel, EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import {
	Scheduler,
	DayView,
	WeekView,
	Appointments,
	Resources,
	ConfirmationDialog,
	AppointmentTooltip,
	AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';

const fullHour = 3600 * 1000;
const fullDay = 24 * fullHour;

const currentDate = Date.now();
const schedulerData: AppointmentModel[] = [
	{
		startDate: -fullDay + Date.now() - 4 * fullHour,
		endDate: -fullDay + Date.now() - 2 * fullHour,
		title: 'João - Exame 1',
		type: 'past-appointment',
	},
	{
		startDate: -fullDay + Date.now() - 5 * fullHour,
		endDate: -fullDay + Date.now(),
		title: 'Luiz - Exame 2',
		type: 'lost-appointment',
	},
	{
		startDate: Date.now() - 3.3 * fullHour,
		endDate: Date.now() - 1.3 * fullHour,
		title: 'Nair - Exame X',
		type: 'lost-appointment',
	},
	{
		startDate: Date.now() - 2 * fullHour,
		endDate: Date.now(),
		title: 'Maria - Exame 3',
		type: 'past-appointment',
	},
	{
		startDate: Date.now() - 2 * fullHour,
		endDate: Date.now(),
		title: 'Renata - Exame 4',
		type: 'lost-appointment',
	},
	{
		startDate: Date.now() + 1 * fullHour,
		endDate: Date.now() + 3 * fullHour,
		title: 'Celso - Exame X',
		type: 'new-appointment',
	},
	{
		startDate: Date.now() + 2 * fullHour,
		endDate: Date.now() + 4 * fullHour,
		title: 'Nicole - Exame X',
		type: 'new-appointment',
	},
	{
		startDate: fullDay + Date.now() - 3 * fullHour,
		endDate: fullDay + Date.now() + 3 * fullHour,
		title: 'Jair - Exame X',
		type: 'new-appointment',
	},
	{
		startDate: 2 * fullDay + Date.now() - 6 * fullHour,
		endDate: 2 * fullDay + Date.now() + 4 * fullHour,
		title: 'Igor - Exame X',
		type: 'new-appointment',
	},
	{
		startDate: 3 * fullDay + Date.now() - 6 * fullHour,
		endDate: 3 * fullDay + Date.now() - 5 * fullHour,
		title: 'Garcia - Exame X',
		type: 'new-appointment',
	},
	{
		startDate: 3 * fullDay + Date.now() - 4 * fullHour,
		endDate: 3 * fullDay + Date.now() - 3 * fullHour,
		title: 'Nogueira - Exame X',
		type: 'new-appointment',
	},
	{
		startDate: 3 * fullDay + Date.now() - 2 * fullHour,
		endDate: 3 * fullDay + Date.now(),
		title: 'Marcia - Exame X',
		type: 'new-appointment',
	},
	{
		startDate: 3 * fullDay + Date.now(),
		endDate: 3 * fullDay + Date.now() + 4 * fullHour,
		title: 'Everton - Exame X',
		type: 'new-appointment',
	},
];

export interface HomeScheduleProps {
	paperStyle: React.CSSProperties | undefined;
	isAdmin: boolean;
}

export const HomeSchedule: React.FC<HomeScheduleProps> = ({ paperStyle, isAdmin }) => {
	const theme = useTheme();

	const resources = [
		{
			fieldName: 'type',
			title: 'Type',
			instances: [
				{ id: 'new-appointment', text: 'New Appointment', color: theme.palette.info.light },
				{ id: 'past-appointment', text: 'Past Appointment', color: theme.palette.primary.light },
				{ id: 'lost-appointment', text: 'Lost Appointment', color: theme.palette.error.light },
			],
		},
	];

	const commitChanges = ({ added, changed, deleted }: { added?: any; changed?: any; deleted?: any }) => {
		console.log(added);
		console.log(changed);
		console.log(deleted);
	};

	return (
		<Paper style={paperStyle} elevation={7}>
			<Scheduler locale='pt-br' data={schedulerData}>
				<ViewState currentDate={currentDate} />
				<EditingState onCommitChanges={commitChanges} />
				<IntegratedEditing />
				{isAdmin ? (
					<WeekView name='Work Week' excludedDays={[0, 6]} startDayHour={7} endDayHour={19} cellDuration={120} />
				) : (
					<DayView name='Work Day' startDayHour={7} endDayHour={19} cellDuration={120} />
				)}
				<ConfirmationDialog />
				<Appointments />
				<AppointmentTooltip showOpenButton showDeleteButton />
				<AppointmentForm />
				<Resources data={resources} />
			</Scheduler>
		</Paper>
	);
};
