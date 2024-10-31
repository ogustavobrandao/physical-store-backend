import {Request, Response, NextFunction} from 'express';
import logger from '../config/logger';
import { AppError } from '../errors/AppError';

export const errorHandler = (
    error: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {

    if (error instanceof AppError){
        logger.warn(`Application Error: ${error.message})`, {
            statusCode: error.statusCode,
            path: req.path,
            method: req.method,
            stack: error.stack,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            }:null,
        });

        res.status(error.statusCode).json({status: 'error', message: error.message})
    }else{
        logger.error('Unexpected Error:', {
            message: error.message,
            stack: error.stack,
            path: req.path,
            method: req.method,
        });
    
        res.status(500).json({
            status: 'error',
            message: 'Erro interno do servidor.',
        });
    }

}
