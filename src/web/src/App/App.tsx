import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';

// guards
import AuthGuard from '../shared/guards/Auth/Auth.guard';

// compose
import ComponentCompose from '../shared/composes/ComponentCompose/ComponentCompose';

// providers
import ProfileProvider from '../shared/provider-context-hook/profile/Profile.provider';

// components
import HomeComponent from './Home/Home.component';
import ProfileComponent from './Profile/Profile.component';

function App(): JSX.Element {
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
