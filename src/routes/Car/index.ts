import CarController from './../../controllers/Car';
import { Router } from 'express';

const router = Router();

router.post('/create/car', CarController.createCar);

export default router;