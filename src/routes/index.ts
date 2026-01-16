import carRouter from "./Car";
import { Router } from "express";

const router = Router();

router.use("/create/car", carRouter);

export default router;