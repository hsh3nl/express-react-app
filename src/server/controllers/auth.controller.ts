import { Request, Response } from 'express';

const authController = {
    getRegister: (req: Request, res: Response): void => {
        res.oidc.login({
            authorizationParams: {
                screen_hint: 'signup',
            },
        });
    },
};

export { authController };
