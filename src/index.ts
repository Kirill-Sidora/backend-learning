import express from "express";
import { connectToDatabase } from "./models/index";

const application = express();

application.use(express.json());

application.get("/", (_, response) => {
    response.status(200).send("Hello, Express with TypeScript!");
});

const PORT = Number(process.env.PORT);

connectToDatabase();

application.listen(PORT, () => {
    console.log(`🚀 Express server is listening on http://localhost:${PORT}`);
});
