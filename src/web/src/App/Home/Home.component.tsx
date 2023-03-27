import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../shared/translations/i18n/config';
import Cookies from 'js-cookie';

// styles
import styles from './Home.module.css';

const HomeComponent = (): JSX.Element => {
    const { t } = useTranslation();

    const changeLang = (locale: string): void => {
        i18n.changeLanguage(locale);
        Cookies.set('locale', locale);
    }
    return (
        <section>
            <h1>{t('title.home')}</h1>
            <ul>
                <li>
                    <NavLink to="">
                        <span>{t('action.home')}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="profile">
                        <span>{t('action.profile')}</span>
                    </NavLink>
                </li>
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
