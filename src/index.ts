import express from "express";
import { Sequelize } from "sequelize";
import { datavaseConfig } from "./utils/configs";

const application = express();

application.use(express.json());

application.get("/", (_, response) => {
    response.status(200).send("Hello, Express with TypeScript!");
});

const PORT = Number(process.env.PORT);

const sequelize = new Sequelize(
    datavaseConfig.database,
    datavaseConfig.username,
    datavaseConfig.password,
    {
        host: datavaseConfig.host,
        port: datavaseConfig.port,
        dialect: datavaseConfig.dialect,
        logging: datavaseConfig.logging,
        define: {
            underscored: true,
        },
    }
);

const foo = async () => {
    try {
        await sequelize.authenticate();
        console.log(
            "Connection to the database has been established successfully."
        );
    } catch (error) {
        console.log("Unable to connect to the database:", error);
    }
};

foo();

application.listen(PORT, () => {
    console.log(`🚀 Express server is listening on http://localhost:${PORT}`);
});
