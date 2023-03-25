const appRoutes = {
    home: {
        url: '/',
        name: 'home',
    },
    api: {
        v1: {
            auth: {
                callback: {
                    url: '/api/v1/auth/callback',
                    name: 'api.v1.auth.callback',
                },
                login: {
                    url: '/api/v1/auth/login',
                    name: 'api.v1.auth.login',
                },
                logout: {
                    url: '/api/auth/login',
                    name: 'api.v1.auth.logout',
                },
                register: {
                    url: '/api/auth/register',
                    name: 'api.v1.auth.register',
                },
            }
        },
    }
};

export { appRoutes };
