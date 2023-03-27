import { AxiosResponse } from 'axios';
import { ContextProps } from '../../../../interfaces/context/context-props.interface';
import { ProfileGetResponse } from '../response/profile-get-response.interface';
import { StandardResponse } from '../../../../interfaces/response/standard-response.interface';
import { Profile } from '../../../../../App/Profile/model/profile.interface';

export interface ProfileContextProps extends ContextProps {
    actions: {
        getProfile: () => Promise<AxiosResponse<ProfileGetResponse>>;
        updateProfile: (newProfile: Profile) => Promise<AxiosResponse<StandardResponse>>;
    };
}
