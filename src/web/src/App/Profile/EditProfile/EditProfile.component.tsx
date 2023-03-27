import React, { useState, useEffect, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// styles
import styles from './EditProfile.module.css';

// interfaces
import useProfileContext from '../../../shared/provider-context-hook/profile/Profile.hook';
import { Profile } from '../model/profile.interface';
import { AxiosError } from 'axios';

// components
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';

const EditProfileComponent = (): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const profileContext = useProfileContext();
    const [isLoaded, setIsLoaded] = useState(false);

    const [profile, setProfile] = useState<Profile>({
        email: '',
        firstName: '',
        lastName: '',
        profilePicture: '',
    });

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setProfile({
            ...profile,
            firstName: event.currentTarget.value,
        });
    };

    const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setProfile({
            ...profile,
            lastName: event.currentTarget.value,
        });
    };

    const handleUpdateProfile = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const newProfile = {
            ...profile,
            firstName: profile.firstName.trim(),
            lastName: profile.lastName.trim(),
        };
        setIsLoaded(false);
        profileContext.actions
            .updateProfile(newProfile)
            .then((response) => {
                if (response.status === 200 && response.data.statusCode === 201) {
                    alert(t('message.profile.rest-api.update-profile-successful'));
                }
            })
            .catch((error: AxiosError) => {
                alert(t('message.profile.rest-api.update-profile-failed-with-message', { message: error.message }));
            })
            .finally(() => {
                setIsLoaded(true);
            });
    };

    const goHome = (): void => {
        navigate('/');
    };

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
            })
            .finally(() => {
                setIsLoaded(true);
            });
    }, []);

    return (
        <>
            <div className={`${styles['edit-profile-page']}`}>
                <div className={`${styles['profile-box']}`}>
                    <h1>{t('title.edit-profile')}</h1>
                    <Form onSubmit={handleUpdateProfile}>
                        <FormGroup className={`${styles['form-group']}`}>
                            <FormLabel htmlFor="email">{t('form.edit-profile.email')}</FormLabel>
                            <FormControl type="text" id="email" autoComplete="email" value={profile.email} disabled={true} />
                        </FormGroup>
                        <FormGroup className={`${styles['form-group']}`}>
                            <FormLabel htmlFor="first-name">{t('form.edit-profile.first-name')}</FormLabel>
                            <FormControl
                                type="text"
                                id="first-name"
                                autoComplete="first-name"
                                onChange={handleFirstNameChange}
                                value={profile.firstName}
                                disabled={!isLoaded}
                            />
                        </FormGroup>
                        <FormGroup className={`${styles['form-group']}`}>
                            <FormLabel htmlFor="last-name">{t('form.edit-profile.last-name')}</FormLabel>
                            <FormControl
                                type="last-name"
                                id="last-name"
                                autoComplete="last-name"
                                onChange={handleLastNameChange}
                                value={profile.lastName}
                                disabled={!isLoaded}
                            />
                        </FormGroup>
                        <FormControl
                            type="submit"
                            value={t('action.submit')}
                            className={`btn btn-success ${styles['submit-btn']}`}
                            disabled={!isLoaded}
                        ></FormControl>
                        <Button variant="link" onClick={goHome} className={`${styles['back-btn']}`}>
                            {t('action.go-home')}
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default EditProfileComponent;
