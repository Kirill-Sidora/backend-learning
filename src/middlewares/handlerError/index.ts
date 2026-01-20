import { ErrorCode, ErrorMessage, HTTPStatusCode } from "./../../utils/statuses";
import { Response } from "express";
import { Error } from "sequelize";

interface IExtendedError extends Error {
    status?: number,
    statusCode?: number,
    code?: ErrorCode
}

interface IHandlerError {
    error: IExtendedError;
    response: Response;
}

const handlerError = ({
    error,
    response,
}: IHandlerError): void => {
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