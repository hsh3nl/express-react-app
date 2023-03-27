declare const serverUrl: string;

const environmentService = {
    getServerUrl: (): string => {
        if (serverUrl !== '<backend-base-url>') {
            return serverUrl;
        }
        return process.env.REACT_APP_SERVER_URL ?? '/';
    },
};

export default environmentService;
