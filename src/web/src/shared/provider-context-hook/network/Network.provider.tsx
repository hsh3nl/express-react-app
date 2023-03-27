import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// interfaces
import { NetworkContextProps } from './interfaces/network-context-props.interface';

// context
import NetworkContext from './Network.context';

declare const serverUrl: string;

const NetworkProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
    const axiosInstance = axios.create({
        baseURL: serverUrl !== '<backend-base-url>' ? serverUrl : process.env.REACT_APP_SERVER_URL,
        timeout: 15000,
        withCredentials: true,
    });
    console.log(serverUrl !== '<backend-base-url>' ? serverUrl : process.env.REACT_APP_SERVER_URL);

    // Private function
    const generateQueryString = (url: string, params: Record<string, any>): string => {
        // This method will only handle one level deep key value pairs
        let newUrl = url;
        const queryString = new URLSearchParams(params).toString();
        if (queryString) {
            if (url.indexOf('?') > -1) {
                newUrl = `${url}&${queryString}`;
            } else {
                newUrl = `${url}?${queryString}`;
            }
        }
        return newUrl;
    };

    const get = (url: string, params?: Record<string, any>, config?: AxiosRequestConfig<any>): Promise<AxiosResponse> => {
        let newUrl = url;
        if (params) {
            newUrl = generateQueryString(url, params);
        }
        return axiosInstance.get(newUrl, config);
    };

    const post = (url: string, params: Record<string, any>): Promise<AxiosResponse> => {
        return axiosInstance.post(url, params);
    };

    const deleteReq = (url: string): Promise<AxiosResponse> => {
        return axiosInstance.delete(url);
    };

    const value: NetworkContextProps = {
        state: {
            service: axiosInstance,
        },
        actions: {
            get,
            post,
            deleteReq,
        },
        methods: {},
    };

    return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
};

export default NetworkProvider;
