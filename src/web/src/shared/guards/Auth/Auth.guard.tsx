import Cookies from 'js-cookie';

// services
import environmentService from '../../services/environment/environment.service';

const AuthGuard = ({ children }: { children: JSX.Element }): JSX.Element => {
    if (Cookies.get('isLoggedIn') === 'true' && Cookies.get('userId')) {
        return children;
    }
    
    window.location.href = environmentService.getServerUrl() + '/api/v1/auth/login';
    return <></>;
};

export default AuthGuard;
