import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// contexts
import useProfileContext from '../../shared/provider-context-hook/profile/Profile.hook';

// interfaces
import { Profile } from './model/profile.interface';

const ProfileComponent = (): JSX.Element => {
    const { t } = useTranslation();
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
                alert(t('message.profile.rest-api.get-profile-failed-with-message', { errorMsg: error.message }));
            });
    }, []);

    return (
        <div>
            <h1>{t('title.profile')}</h1>
            <img src={profile.profilePicture} alt={profile.firstName} width="200" />
            <p>{t('keyword.profile.email')}: {profile.email}</p>
            <p>{t('keyword.profile.first-name')}: {profile.firstName}</p>
            <p>{t('keyword.profile.last-name')}: {profile.lastName}</p>
        </div>
    );
};

export default ProfileComponent;
