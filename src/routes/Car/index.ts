import CarController from "./../../controllers/Car";
import { Router } from "express";

const router = Router();

router.post("/", CarController.createCar);

router.put("/:carId", CarController.updateCarById);

router.get("/", CarController.getAllCars);

router.get("/:carId", CarController.getCarById);

router.delete("/:carId", CarController.deleteCarById);

export default router;
