// interfaces
import { AxiosResponse } from 'axios';
import { Profile } from '../../../App/Profile/model/profile.interface';
import { ProfileGetResponse } from './interfaces/response/profile-get-response.interface';
import { ProfileContextProps } from './interfaces/context-props/profile-context-props.interface';
import { StandardResponse } from '../../interfaces/response/standard-response.interface';

// hooks
import useNetworkContext from '../network/Network.hook';

// contexts
import ProfileContext from './Profile.context';

const ProfileProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
    const network = useNetworkContext();

    const getProfile = (): Promise<AxiosResponse<ProfileGetResponse>> => {
        const url = '/api/v1/profile';
        return network.actions.get(url);
    };

    const updateProfile = (newProfile: Profile): Promise<AxiosResponse<StandardResponse>> => {
        const url = '/api/v1/profile';
        return network.actions.post(url, newProfile);
    };

    const value: ProfileContextProps = {
        state: {},
        actions: {
            getProfile,
            updateProfile,
        },
        methods: {},
    };

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export default ProfileProvider;
