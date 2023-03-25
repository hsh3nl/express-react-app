import { Response } from 'express';

// interfaces
import { StandardResponse } from './interfaces/standard-response.interface';
import { SuccessResponse } from './interfaces/success-response.interface';

const jsonResponseService = {
    returnError: (statusCode: number, message: string, res: Response): void => {
        const errorResponse: StandardResponse = {
            statusCode,
            serverTime: new Date().getTime(),
            message,
        };
        res.json(errorResponse);
    },
    returnSuccess: <T>(results: T, res: Response): void => {
        const successResponse: SuccessResponse<T> = {
            results,
            statusCode: 200,
            serverTime: new Date().getTime(),
            message: 'OK',
        };
        res.json(successResponse);
    },
};

export { jsonResponseService };
