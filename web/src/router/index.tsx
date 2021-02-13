import React from 'react';

// Routing
import { Switch, Route, RouteProps, Redirect, useLocation } from 'react-router-dom';
import { PrimarySearchAppBar } from '../components/NavBar';
import { HomePage, LoginPage, CustomersPage, ServicesPage } from '../pages';
import { PFDetailPage } from '../pages/Customers/PFDetail';
import { PJDetailPage } from '../pages/Customers/PJDetail';
import { authFunctionalities } from '../utilities/authentication';

// Utilities
import { useSnackbar } from 'notistack';

interface AuthedRouteProps extends RouteProps {}

const PrivateOnlyRoute: React.FC<AuthedRouteProps> = ({ children, ...rest }) => {
	const location = useLocation();

	if (authFunctionalities.isLoggedIn()) {
		return (
			<Route {...rest}>
				<PrimarySearchAppBar title='AMECO' />
				{children}
			</Route>
		);
	} else {
		return (
			<Route {...rest}>
				<Redirect
					to={{
						pathname: '/login',
						state: {
							from: location,
						},
					}}
				/>
			</Route>
		);
	}
};

const PublicOnlyRoute: React.FC<Omit<AuthedRouteProps, 'TopBar'>> = ({ children, ...rest }) => {
	return <Route {...rest}>{children}</Route>;
};

const NoMatchRoute: React.FC<AuthedRouteProps> = ({ children, ...rest }) => {

	const { enqueueSnackbar } = useSnackbar();

	enqueueSnackbar("A página que você buscou não existe, ou você não tem permissão para acessa-la !", {variant: "error"})

	return (
		<Route path='*'>
			<Redirect
				to={{
					pathname: '/',
				}}
			/>
		</Route>
	)
}


interface BaseRouterProps {}

export const BaseRouter: React.FC<BaseRouterProps> = () => {
	return (
		<Switch>
			<PrivateOnlyRoute exact path='/Customers/PF/:PFcustomerID'>
				<PFDetailPage />
			</PrivateOnlyRoute>
			<PrivateOnlyRoute exact path='/Customers/PJ/:PJcustomerID'>
				<PJDetailPage />
			</PrivateOnlyRoute>
			<PrivateOnlyRoute exact path='/Customers/PF'>
				<CustomersPage />
			</PrivateOnlyRoute>
			<PrivateOnlyRoute exact path='/Customers/PJ'>
				<CustomersPage />
			</PrivateOnlyRoute>
			<PrivateOnlyRoute exact path='/Services'>
				<ServicesPage />
			</PrivateOnlyRoute>
			<PrivateOnlyRoute exact path='/'>
				<HomePage />
			</PrivateOnlyRoute>
			<PublicOnlyRoute exact path='/login'>
				<LoginPage />
			</PublicOnlyRoute>
			<NoMatchRoute/>
		</Switch>
	);
};
