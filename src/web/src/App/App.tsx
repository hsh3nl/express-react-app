import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import i18n from '../shared/translations/i18n/config';
import Cookies from 'js-cookie';

// guards
import AuthGuard from '../shared/guards/Auth/Auth.guard';

// compose
import ComponentCompose from '../shared/composes/ComponentCompose/ComponentCompose';

// providers
import ProfileProvider from '../shared/provider-context-hook/profile/Profile.provider';

// components
import HomeComponent from './Home/Home.component';
import ProfileComponent from './Profile/Profile.component';
import { useEffect } from 'react';

function App(): JSX.Element {
    const setLocaleIfChanged = () => {
        const setLocale = Cookies.get('locale');
        if (setLocale && i18n.languages.includes(setLocale)) {
            i18n.changeLanguage(setLocale);
        }
    }

    useEffect(() => {
        setLocaleIfChanged();
    }, []);

    return (
        <Routes>
            <Route path="" element={<HomeComponent />} />
            <Route
                element={
                    <AuthGuard>
                        <ComponentCompose components={[ProfileProvider]}>
                            <Outlet />
                        </ComponentCompose>
                    </AuthGuard>
                }
            >
                <Route path="profile" element={<ProfileComponent />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
