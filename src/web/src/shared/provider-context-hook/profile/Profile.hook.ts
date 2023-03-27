import { useContext } from 'react';

// interfaces
import { ProfileContextProps } from './interfaces/context-props/profile-context-props.interface';

// contexts
import ProfileContext from './Profile.context';

const useProfileContext = (): ProfileContextProps => {
    const profileContext = useContext(ProfileContext);
    if (!profileContext) {
        throw new Error('No <ProfileContext.Provider> found when calling useProfileContext');
    }
    return profileContext;
};

export default useProfileContext;
