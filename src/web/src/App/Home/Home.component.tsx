import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../shared/translations/i18n/config';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

// styles
import styles from './Home.module.css';

// services
import environmentService from '../../shared/services/environment/environment.service';

const HomeComponent = (): JSX.Element => {
    const { t } = useTranslation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const changeLang = (locale: string): void => {
        i18n.changeLanguage(locale);
        Cookies.set('locale', locale);
    };

    const goToLogin = (): void => {
        window.location.href = environmentService.getServerUrl() + '/api/v1/auth/login';
    };

    const logout = (): void => {
        window.location.href = environmentService.getServerUrl() + '/api/v1/auth/logout';
    };

    useEffect(() => {
        if (Cookies.get('isLoggedIn') === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <section>
            <h1>{t('title.home')}</h1>
            <ul>
                <li>
                    <NavLink to="">
                        <span>{t('action.home')}</span>
                    </NavLink>
                </li>
                {isLoggedIn ? (
                    <>
                        <li>
                            <NavLink to="profile">
                                <span>{t('action.profile')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="profile/edit">
                                <span>{t('action.edit-profile')}</span>
                            </NavLink>
                        </li>
                        <li>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a onClick={logout} className="link">
                                {t('action.logout')}
                            </a>
                        </li>
                    </>
                ) : (
                    <li>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a onClick={goToLogin} className="link">
                            {t('action.login')}
                        </a>
                    </li>
                )}
            </ul>
            <div>
                <h2>{t('keyword.home.change-language')}</h2>
                <button onClick={(): void => changeLang('jp')}>{t('keyword.general.language.jp')}</button>
                <button onClick={(): void => changeLang('en')}>{t('keyword.general.language.en')}</button>
                <button onClick={(): void => changeLang('bm')}>{t('keyword.general.language.bm')}</button>
                <button onClick={(): void => changeLang('zh')}>{t('keyword.general.language.zh')}</button>
            </div>
        </section>
    );
};

export default HomeComponent;
