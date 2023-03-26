import { Request, Response } from 'express';

// services
import { jsonResponseService } from '../services/json-response/json-response.service';

// models
import { User } from '../database/models/user.model';

const profileController = {
    getProfile: async (req: Request, res: Response): Promise<void> => {
        const email = req.oidc.user?.email ?? '';
        if (!email) {
            jsonResponseService.returnResponse(404, 'User not found.', res);
            return;
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            jsonResponseService.returnResponse(404, 'User not found.', res);
            return;
        }

        jsonResponseService.returnSuccess({
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            profilePicture: user.profile_picture,
        }, res);
    },
    updateProfile: async (req: Request, res: Response): Promise<void> => {
        const { firstName, lastName } = req.body;
        if (!firstName || !lastName) {
            jsonResponseService.returnResponse(400, 'Missing parameters.', res);
            return;
        }
        
        const userEmail = req.oidc.user?.email;
        const thisUser = await User.findOne({ where: {
            email: userEmail,
        } });
        if (!thisUser) {
            jsonResponseService.returnResponse(400, 'User not found.', res);
            return;
        }

        await thisUser.update({
            first_name: firstName,
            last_name: lastName,
        });
        await thisUser.save();
        jsonResponseService.returnResponse(201, 'User successfully saved.', res);
    },
};

export { profileController };
