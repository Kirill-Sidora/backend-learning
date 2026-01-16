import CarController from './../../controllers/Car';
import { Router } from 'express';

const router = Router();

router.post('/', CarController.createCar);

export default router;