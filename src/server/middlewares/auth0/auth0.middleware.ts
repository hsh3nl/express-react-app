import { Express } from 'express';
import { auth } from 'express-openid-connect';

const useAuth0 = (app: Express): void => {
    app.use(
        auth({
            issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
            baseURL: process.env.BASE_URL,
            clientID: process.env.AUTH0_CLIENT_ID,
            secret: process.env.SESSION_SECRET,
            authRequired: false,
            auth0Logout: true,
            routes: {
                logout: '/api/auth/logout',
                login: '/api/auth/login',
                callback: '/api/auth/callback',
            },
        }),
    );
};

export { useAuth0 };