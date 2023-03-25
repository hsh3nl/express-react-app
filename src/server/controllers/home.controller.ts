import { Request, Response } from "express";

const homeController = {
    home: (req: Request, res: Response) => {
        res.send('Express app home. You are ' + (req.oidc.isAuthenticated() ? 'logged in.': 'logged out.'));
    }
};

export { homeController };