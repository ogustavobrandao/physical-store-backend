export class AppError extends Error {
    public readonly statusCode: number;
    public readonly response?: any;

    constructor(message: string, statusCode = 500, response?: any) {
        super(message);
        this.statusCode = statusCode;
        this.response = response;

        Error.captureStackTrace(this, this.constructor);
        
        Object.setPrototypeOf(this, AppError.prototype);
    }
}