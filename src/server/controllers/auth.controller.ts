import { Request, Response } from 'express';

const authController = {
    register: (req: Request, res: Response) => {
        res.oidc.login({
            authorizationParams: {
                screen_hint: 'signup',
            },
        });
    },
};

export { authController };
