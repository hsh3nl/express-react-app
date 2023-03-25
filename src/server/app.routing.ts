import { Express, Request, Response } from 'express';
import { appRoutes } from './app.routes';
import { homeController } from './controllers/home.controller';
import { authController } from './controllers/auth.controller';

// Routing
const useAppRouting = (app: Express): void => {
    // Home
    app.get(appRoutes.home.url, homeController.home);
    
    // Register (Login, logout, callback are auto-configured by Auth0 configuration in auth0.middleware)
    app.get(appRoutes.api.v1.auth.register.url, authController.register);
}

export { useAppRouting };
