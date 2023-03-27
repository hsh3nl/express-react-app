/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ContextProps } from '../../../interfaces/context/context-props.interface';

export interface NetworkContextProps extends ContextProps {
    state: {
        service: AxiosInstance;
    };
    actions: {
        get: (url: string, params?: Record<string, any>, config?: AxiosRequestConfig) => Promise<AxiosResponse>;
        post: (url: string, params: Record<string, any>) => Promise<AxiosResponse>;
        deleteReq: (url: string) => Promise<AxiosResponse>;
    };
}
