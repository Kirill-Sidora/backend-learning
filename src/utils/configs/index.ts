import dotenv from "dotenv";
import { Dialect } from "sequelize";

dotenv.config();

type DialectEnv = Dialect | undefined;

export interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: Dialect;
    logging: boolean;
}

export const databaseConfig: DatabaseConfig = {
    username: process.env.DB_USERNAME ?? "backend_learning_user",
    password: process.env.DB_PASSWORD ?? "14112005KIRILL",
    database: process.env.DB_NAME ?? "backend_learning_db",
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT) ?? 5432,
    dialect: (process.env.DB_DIALECT as DialectEnv) ?? "postgres",
    logging: process.env.DB_LOGGING === "true" as const
}