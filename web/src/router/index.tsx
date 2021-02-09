import React from 'react';

// Routing
import { Switch, Route, RouteProps, Redirect, useLocation } from 'react-router-dom';
import { PrimarySearchAppBar } from '../components/NavBar';
import { HomePage, LoginPage, CustomersPage } from '../pages';
import { PFDetailPage } from '../pages/Customers/PFDetail';
import { PJDetailPage } from '../pages/Customers/PJDetail';
import { authFunctionalities } from '../utilities/authentication';

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

interface BaseRouterProps {}

export const BaseRouter: React.FC<BaseRouterProps> = () => {
	return (
		<Switch>
			<PrivateOnlyRoute path='/Customers/PF/:PFcustomerID'>
				<PFDetailPage />
			</PrivateOnlyRoute>
			<PrivateOnlyRoute path='/Customers/PJ/:PJcustomerID'>
				<PJDetailPage />
			</PrivateOnlyRoute>
			<PrivateOnlyRoute path='/Customers'>
				<CustomersPage />
			</PrivateOnlyRoute>
			<PrivateOnlyRoute exact path='/'>
				<HomePage />
			</PrivateOnlyRoute>
			<PublicOnlyRoute path='/login'>
				<LoginPage />
			</PublicOnlyRoute>
		</Switch>
	);
};
