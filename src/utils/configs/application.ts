import { ApplicationDefault } from "./../../utils/constants/app";

const rawPort = Number(process.env.PORT);

export const applicationConfig = {
    name: ApplicationDefault.SERVICE_NAME,
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number.isNaN(rawPort) ? ApplicationDefault.DEFAULT_PORT : rawPort,
    ip: process.env.IP ?? ApplicationDefault.DEFAULT_ID,
};