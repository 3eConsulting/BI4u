import { decode} from 'jsonwebtoken';

export enum eRole {
    ADMIN='ADMIN',
    STAFF='STAFF',
    USER='USER'
}


export interface iDecodedAccessToken {
    username: string;
    iat: number;
    exp: number;
}

export interface iAccessTokenPayload {
    status: string;
    accessToken: string;
    user: iUser;
}

export interface iUser {
    id?: string;
    username: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: eRole;
}

export interface iAuthObject {
    user: iUser;
    accessToken: string;
}



export interface iAuthFunctionalities {
    getAuthObject(): iAuthObject | undefined;
    setAuthObject(accessToken: string, user: iUser): void; 
    removeAuthObject(): void;
    renewAuthObject(accessToken: string, user: iUser): void;
    getAccessToken(): string | undefined;
    getUser(): iUser | undefined;
    getRole(): eRole | undefined; 
    isAuthenticated(isAuthCallback?: CallableFunction , isNotAuthCallback?: CallableFunction): boolean;
    isLoggedIn(): boolean;
    signIn(username: string, password: string): Promise<boolean>;
    signOut(): void;
}

export const authFunctionalities: iAuthFunctionalities = {

    getAuthObject: () => {
        let storedAuthObject = localStorage.getItem('authObject');
        let authObject: iAuthObject;
        if(storedAuthObject) {
            authObject = JSON.parse(storedAuthObject) as iAuthObject;
            return authObject;
        }
    },

    setAuthObject: (accessToken, user) => {
        let authObject: iAuthObject = { accessToken, user }
        let storedAuthObject = JSON.stringify(authObject);
        localStorage.setItem('authObject', storedAuthObject);
    },

    removeAuthObject: () => localStorage.removeItem('authObject'),

    renewAuthObject: (accessToken, user) => {
        authFunctionalities.removeAuthObject();
        authFunctionalities.setAuthObject(accessToken, user);
    },

    getAccessToken: () => {
        let authObject = authFunctionalities.getAuthObject();
        if (authObject) {
            return authObject.accessToken
        }
    },

    getUser: () => {
        let authObject = authFunctionalities.getAuthObject();
        if (authObject) {
            return authObject.user
        }
    },

    getRole: () => {
        let user = authFunctionalities.getUser();
        if (user && user.role) {
            return user.role;
        } 
    },

    isAuthenticated: (isAuthCallback, isNotAuthCallback) => {
        let accessToken = authFunctionalities.getAccessToken();
        if (!accessToken) { 
            return true;
        } else {
            
            let decodedAccessToken = decode(accessToken) as iDecodedAccessToken
            
            try {
                console.log('about to check exp')
                if (Date.now() >= decodedAccessToken.exp * 1000) {
                    console.log('expired')
                    authFunctionalities.removeAuthObject()
                    return false;
                } else {
                    console.log('NOT expired')
                    return true;
                }
            } catch {
                return false
            }
            
        }
    },

    isLoggedIn: () => {
        const authObject = authFunctionalities.getAuthObject();
        if (!authObject) {
            return false
        } else {
            let payload = decode(authObject.accessToken) as {username: string, exp: number, iat: number};
            
            if (!payload) {
                authFunctionalities.signOut();
                return false
            };

            if (Date.now() >= (1000 * (payload.exp + (10 * 60)))) {
                authFunctionalities.signOut();
                return false
            }
            return true;
        }
      
    },

    signIn: async (username: string, password: string) => {
        authFunctionalities.removeAuthObject();

        const response = await fetch(`${process.env.REACT_APP_SEVER_BASE_URI}/login`, {
            method: "POST",
            credentials: "include",
            headers: new Headers({
                'Content-type': 'application/json'
            }),
            body: JSON.stringify({
                username:  username,
                password: password
            })
        });

        if (response.ok) { 
            const { accessToken, user } = await response.json();
            authFunctionalities.setAuthObject(accessToken, user);

            return true;
        } else {
            const {error} = await response.json();
            console.error(error);

            return false;
        }        
    
    },

    signOut: async () => {
        // @TODO call to signout endpoint
        await fetch(`${process.env.REACT_APP_SEVER_BASE_URI}/logout`, {
            method: 'POST',
            credentials: 'include'
        })
        authFunctionalities.removeAuthObject();
    }


}