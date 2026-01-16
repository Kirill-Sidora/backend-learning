import CarController from "./../../controllers/Car";
import { Router } from "express";

const router = Router();

router.post("/", CarController.createCar);

router.get("/:carId", CarController.getCar);

router.get("/", CarController.getAllCars);

export default router;
