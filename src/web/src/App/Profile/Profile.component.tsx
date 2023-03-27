import { useEffect, useState } from 'react';

// contexts
import useProfileContext from '../../shared/provider-context-hook/profile/Profile.hook';

// interfaces
import { Profile } from './model/profile.interface';

const ProfileComponent = (): JSX.Element => {
    const profileContext = useProfileContext();
    const [profile, setProfile] = useState<Profile>({
        email: '',
        firstName: '',
        lastName: '',
        profilePicture: '',
    });

    useEffect(() => {
        profileContext.actions
            .getProfile()
            .then((response) => {
                if (response.status === 200 && response.data.statusCode === 200) {
                    setProfile(response.data.results);
                }
            })
            .catch((error) => {
                alert('Error retrieving user profile. ' + error.message);
            });
    }, []);

    return (
        <div>
            <h1>Welcome to my profile</h1>
            <img src={profile.profilePicture} alt={profile.firstName} width="200" />
            <p>Email: {profile.email}</p>
            <p>First name: {profile.firstName}</p>
            <p>Last name: {profile.lastName}</p>
        </div>
    );
};

export default ProfileComponent;
