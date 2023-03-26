# express-react-app

# Setting up for development
## 1. Install nodejs.

## 1. Install all dependencies with:
`$ npm ci`

## 1. Create a copy of .env.sample and rename it to .env. Update the .env file as relevant to the environment.

# Local development
## Start server with:
`$ npm run dev`

# Production
## Building server dist files and starting the node express server
`$ npm run build`
`$ npm run start`

# Architecture and conventions for server development
## Setting up a new API controller
### 1. Add a new API endpoint in the app.routes.ts file e.g.:
```
profile: {
    url: '/api/v1/profile',
    name: 'api.v1.profile',
},
```

### 1. Add the new feature controller in /src/server/controllers/<feature-name>.controller.ts e.g.:
```
import { Request, Response } from 'express';

const profileController = {
    getProfile: (req: Request, res: Response): void => {
        res.send('Get profile response.');
    },
};

export { profileController };
```
#### Note: The controller method must be named with the following convention: `<http-method><Feature-Method>`.

### 1. Add the new route and controller into the app.routing.ts file e.g.:
```
// Profile
app.get(appRoutes.api.v1.profile.url, profileController.getProfile);
```

### 1, Go to the route to check that the endpoint works e.g. /api/v1/profile.