import React from 'react';
import { SnackbarProvider } from 'notistack';
import { BaseRouter } from './router';
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, Observable } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { authFunctionalities, iAccessTokenPayload } from './utilities/authentication';
import { TokenRefreshLink } from 'apollo-link-token-refresh';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import Button from '@material-ui/core/Button';

const apolloCache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const requestLink = new ApolloLink(
	(operation, forward) =>
		new Observable((observer) => {
			let handle: any;
			Promise.resolve(operation)
				.then((operation) => {
					const accessToken = authFunctionalities.getAccessToken();
					if (accessToken) {
						operation.setContext({
							headers: {
								authorization: `Bearer ${accessToken}`,
							},
						});
					}
				})
				.then(() => {
					handle = forward(operation).subscribe({
						next: observer.next.bind(observer),
						error: observer.error.bind(observer),
						complete: observer.complete.bind(observer),
					});
				})
				.catch(observer.error.bind(observer));

			return () => {
				if (handle) handle.unsubscribe();
			};
		})
);

const client = new ApolloClient({
	cache: apolloCache,
	link: ApolloLink.from([
		errorLink,
		new TokenRefreshLink<iAccessTokenPayload>({
			accessTokenField: 'accessToken',
			isTokenValidOrUndefined: () => {
				return authFunctionalities.isAuthenticated();
			},
			fetchAccessToken: async () => {
				return await fetch(`${process.env.REACT_APP_SEVER_BASE_URI}/refresh-session`, {
					method: 'POST',
					credentials: 'include',
				});
			},
			handleResponse: (operation, accessTokenField) => async (response: Response) => {
				const { accessToken, user } = await response.json();

				authFunctionalities.renewAuthObject(accessToken, user);

				return {
					accessToken: accessToken,
				};
			},
			handleFetch: (accessToken) => {},
			handleError: (err) => {
				console.warn('Your refresh token is invalid. Try to relogin');
				console.error(err);
			},
		}),
		requestLink,
		new HttpLink({
			uri: `${process.env.REACT_APP_SEVER_BASE_URI}/api`,
			credentials: 'include',
		}),
	]),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
		},
	},
});

// Dismiss Snackbar Action
const notistackRef = React.createRef<SnackbarProvider>();
const onClickDismiss = (key: any) => () => { 
    notistackRef!.current!.closeSnackbar(key);
}


function App() {
	return (
		<SnackbarProvider dense maxSnack={3}
			anchorOrigin={{vertical: "bottom", horizontal: "right"}}
			ref={notistackRef}
			action={(key) => (
				<Button onClick={onClickDismiss(key)} variant="outlined">
					Fechar
				</Button>
			)}>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<ApolloProvider client={client}>
					<BaseRouter />
				</ApolloProvider>
			</MuiPickersUtilsProvider>
		</SnackbarProvider>
	);
}

export default App;
