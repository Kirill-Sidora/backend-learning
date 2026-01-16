import carRouter from "./Car";
import { Router } from "express";

const router = Router();

router.use("/car", carRouter);

export default router;