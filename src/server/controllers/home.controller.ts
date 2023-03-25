import { Request, Response } from "express";

const homeController = {
    getHome: (req: Request, res: Response): void => {
        res.send('Express app home. You are ' + (req.oidc.isAuthenticated() ? 'logged in.': 'logged out.'));
    }
};

export { homeController };