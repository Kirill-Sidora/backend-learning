import { TYPE_UNDEFINED } from '../constants/app';
import { Response } from 'express';

interface ISuccessPayload {
    message?: string;
    meta?: unknown;
    tokens?: unknown;
    statusCode?: number;
    total?: number;
}

export const sendSuccess = (
    response: Response,
    { message, meta, tokens, statusCode, total }: ISuccessPayload = {}
): void => {
    response.status(statusCode ?? 200).json({
        ok: true,
        message: message ?? "OK",
        meta: typeof meta === TYPE_UNDEFINED ? null : meta,
        tokens: tokens ?? {},
        total: total ?? 0,
    });
};
