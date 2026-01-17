import CarController from "./../../controllers/Car";
import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /car:
 *   post:
 *      tags:
 *            - Car
 *      summary: Create car entity
 *      parameters:
 *            - in: path
 *              name: carId
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Car entity created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: ''
 *          400:
 *              description: Invalid payload
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: ''
 */
router.post("/", CarController.createCar);

router.put("/:carId", CarController.updateCarById);

router.get("/", CarController.getAllCars);

router.get("/:carId", CarController.getCarById);

router.delete("/:carId", CarController.deleteCarById);

export default router;
