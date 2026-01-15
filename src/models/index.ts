import { databaseConfig } from "../utils/configs";
import { initCarModel } from "./car.model";
import { Sequelize } from "sequelize";

const initializeModels = (): void => {
    initCarModel(sequelize);
}

export const sequelize = new Sequelize(
    databaseConfig.database,
    databaseConfig.username,
    databaseConfig.password,
    {
        host: databaseConfig.host,
        port: databaseConfig.port,
        dialect: databaseConfig.dialect,
        logging: databaseConfig.logging === true,
        define: {
            underscored: true,
        },
    }
);

export const connectToDatabase = async () => {
    initializeModels();
    await sequelize.authenticate();
    await sequelize.sync();
}