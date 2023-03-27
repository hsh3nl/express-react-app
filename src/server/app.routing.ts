import { Express } from 'express';

// routes
import { appRoutes } from './app.routes';

// controllers
import { authController } from './controllers/auth.controller';
import { profileController } from './controllers/profile.controller';

// guards
import { authGuard } from './middlewares/auth0.middleware';

// Routing
const useAppRouting = (app: Express): void => {    
    // Register (Login, logout, callback are auto-configured by Auth0 configuration in auth0.middleware)
    app.get(appRoutes.api.v1.auth.register.url, authController.getRegister);

    // Profile
    app.get(appRoutes.api.v1.profile.url, authGuard, profileController.getProfile);
    app.post(appRoutes.api.v1.profile.url, authGuard, profileController.updateProfile);
}

export { useAppRouting };
