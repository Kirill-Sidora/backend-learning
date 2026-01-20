import { ErrorCode, ErrorMessage, HTTPStatusCode } from "./../../utils/statuses";
import { NextFunction, Response, Request } from "express";
import { Error } from "sequelize";

interface IExtendedError extends Error {
    status?: number,
    statusCode?: number,
    code?: ErrorCode
}

const handlerError = (
    error: IExtendedError,
    _request: Request,
    response: Response,
    _next: NextFunction,
): void => {
    const statusCode: number = error.statusCode ?? error.status ?? HTTPStatusCode.INTERNAL_SERVER_ERROR;

    const code: ErrorCode = error.code ?? ErrorCode.INTERNAL;

    const message: string = error.message || ErrorMessage.INTERNAL;

    response.status(statusCode).json({
        ok: false,
        error: {
            code,
            message,
        }
    })
}

export default handlerError;