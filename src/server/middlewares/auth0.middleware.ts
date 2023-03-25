import { Express, Request, Response, NextFunction } from 'express';
import { auth } from 'express-openid-connect';
import { appRoutes } from '../app.routes';

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
                logout: appRoutes.api.v1.auth.logout.url,
                login: appRoutes.api.v1.auth.login.url,
                callback: appRoutes.api.v1.auth.callback.url,
            },
        }),
    );

    app.use((req: Request, res: Response, next: NextFunction): void => {
        res.locals.isAuthenticated = req.oidc.isAuthenticated();
        next();
    })
};

export { useAuth0 };