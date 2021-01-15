import React from 'react';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
	const link = 'http://3econsulting.com.br/';
	const name = '3eConsulting';

	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href={link}>
				{name}
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}
