import { Request, Response } from 'express';

// services
import { jsonResponseService } from '../services/json-response/json-response.service';

// models
import { User } from '../database/models/user.model';

const profileController = {
    getProfile: async (req: Request, res: Response): Promise<void> => {
        if (!req.oidc.isAuthenticated()) {
            jsonResponseService.returnError(401, 'User not logged in.', res);
            return;
        }

        const email = req.oidc.user?.email ?? '';
        if (!email) {
            jsonResponseService.returnError(404, 'User not found.', res);
            return;
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            jsonResponseService.returnError(404, 'User not found.', res);
            return;
        }

        jsonResponseService.returnSuccess({
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            profilePicture: user.profile_picture,
        }, res);
    },
};

export { profileController };
