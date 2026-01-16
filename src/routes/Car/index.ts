import CarController from "./../../controllers/Car";
import { Router } from "express";

const router = Router();

router.post("/", CarController.createCar);

router.get("/:carId", CarController.getCarById);

router.put("/:carId", CarController.updateCarById);

router.patch("/:carId", CarController.updateCarById);

router.get("/", CarController.getAllCars);

export default router;
