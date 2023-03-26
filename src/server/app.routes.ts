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
                    url: '/api/v1/auth/logout',
                    name: 'api.v1.auth.logout',
                },
                register: {
                    url: '/api/v1/auth/register',
                    name: 'api.v1.auth.register',
                },
            },
            profile: {
                url: '/api/v1/profile',
                name: 'api.v1.profile',
            },
        },
    },
};

export { appRoutes };
