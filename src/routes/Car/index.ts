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
 *      responses:
 *          201:
 *              description: Car entity created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/CarCreateRequest'
 *          400:
 *              description: Invalid payload
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/ErrorResponse'
 */
router.post("/", CarController.createCar);

/**
 * @openapi
 * /car/{carid}:
 *   put:
 *     tags:
 *       - Car
 *     summary: Update existing car entity fields
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarUpdateRequest'
 *     responses:
 *       200:
 *         description: Car entity updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarCreateResponse'
 *       400:
 *         description: Invalid payload
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Car entity not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarEntityNotFound'
 */
router.put("/:carId", CarController.updateCarById);

/**
 * @openapi
 * /car:
 *   get:
 *     tags:
 *       - Car
 *     summary: Get all car's entity
 *     responses:
 *       200:
 *         description: The car entities have been successfully getted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarResponse'
 */
router.get("/", CarController.getAllCars);

/**
 * @openapi
 * /car/{carId}:
 *   get:
 *     tags:
 *       - Car
 *     summary: Get car entity by id
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Car entity by id was successfully getted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarResponse'
 *       400:
 *         description: Invalid payload
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Car entity not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarEntityNotFound'
 */
router.get("/:carId", CarController.getCarById);

/**
 * @openapi
 * /car/{carId}:
 *   delete:
 *     tags:
 *       - Car
 *     summary: Delete car entity by id
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car entity deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Car entity not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarEntityNotFound'
 */
router.delete("/:carId", CarController.deleteCarById);

export default router;
