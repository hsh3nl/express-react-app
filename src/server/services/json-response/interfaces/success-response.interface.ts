import { StandardResponse } from './standard-response.interface';

export interface SuccessResponse<T> extends StandardResponse {
    statusCode: 200;
    results: T;
};
