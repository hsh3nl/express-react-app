import { Request, Response } from 'express';

const profileController = {
    getProfile: (req: Request, res: Response): void => {
        res.send('Get profile response.');
    },
};

export { profileController };
