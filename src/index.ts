import express from "express";
import router from "./routes/index";
import swaggerUi from "swagger-ui-express";
import { swaggerSpecification } from "./docs/swagger";
import { connectToDatabase } from "./models/index";
import { Paths } from "./utils/constants/app";

const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true }));

application.use(router);

application.get("/", (_, response) => {
    response.status(200).send("Hello, Express with TypeScript!");
});

const PORT = Number(process.env.PORT);

connectToDatabase();

application.use(
    Paths.DOCS_PATH,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecification, { explorer: true }),
);

application.listen(PORT, () => {
    console.log(`🚀 Express server is listening on http://localhost:${PORT}`);
});
