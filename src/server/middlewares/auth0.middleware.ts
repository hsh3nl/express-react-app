import { Express, Request, Response, NextFunction } from 'express';
import { Session, auth } from 'express-openid-connect';
import axios, { AxiosError, AxiosResponse } from 'axios';

// routes
import { appRoutes } from '../app.routes';

// models
import { User } from '../database/models/user.model';

interface Auth0UserInfo {
    sub: string;
    given_name: string;
    family_name: string;
    nickname: string;
    name: string;
    picture: string;
    locale: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
}

const useAuth0 = (app: Express): void => {
    const createUserIfNew = async (response: AxiosResponse<Auth0UserInfo> | AxiosError): Promise<void> => {
        if (response.status === 200 && 'data' in response) {
            const userProfile: Auth0UserInfo = response.data;
            const [user, created] = await User.findOrCreate({
                where: {
                    email: userProfile.email.toLowerCase(),
                },
                defaults: {
                    email: userProfile.email.toLowerCase(),
                    first_name: userProfile.given_name ?? '',
                    last_name: userProfile.family_name ?? '',
                    profile_picture: userProfile.picture ?? '',
                },
            });
            if (created) {
                console.log('[INFO]: New user created for :', userProfile.email);
            }
        } else {
            console.error('[SEVERE]: Failed to retrieve user info from Auth0.');
        }
    };

    const afterCallback = async (req: Request, res: Response, session: Session, decodedState: Record<string, any>): Promise<Session> => {
        if (session.token_type && session.access_token) {
            const response = await axios.get(process.env.AUTH0_ISSUER_BASE_URL + 'userinfo', {
                headers: {
                    Authorization: `${session.token_type} ${session.access_token}`,
                },
            });
            createUserIfNew(response);
        }
        return session;
    };

    if (!process.env.AUTH0_ISSUER_BASE_URL) {
        throw new Error('[SEVERE]: Environment variable AUTH0_ISSUER_BASE_URL is not set.');
    }

    app.use(
        auth({
            issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
            baseURL: process.env.BASE_URL,
            clientID: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            secret: process.env.SESSION_SECRET,
            authRequired: false,
            auth0Logout: true,
            routes: {
                logout: appRoutes.api.v1.auth.logout.url,
                login: appRoutes.api.v1.auth.login.url,
                callback: appRoutes.api.v1.auth.callback.url,
            },
            authorizationParams: {
                scope: 'openid profile email',
                audience:
                    process.env.AUTH0_ISSUER_BASE_URL + 'userinfo',
                response_type: 'code',
            },
            afterCallback,
        }),
    );

    app.use((req: Request, res: Response, next: NextFunction): void => {
        res.locals.isAuthenticated = req.oidc.isAuthenticated();
        next();
    });
};

export { useAuth0 };
