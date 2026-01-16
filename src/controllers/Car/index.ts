import { sendSuccess } from './../../utils/response';
import { CarService } from "../../services/Car";
import { Request, Response } from 'express';


const carService = new CarService();

class CarController {
    public static async createCar(
        request: Request,
        response: Response,
    ): Promise<void> {
        try {
            const { brand, model, year_of_release, cost } = request.body;

            const car = await carService.createCar({
                brand: brand,
                model: model,
                year_of_release: year_of_release,
                cost: cost,
            })

            sendSuccess(response, {
                message: "Car created succesfully",
                meta: car,
                statusCode: 201,
            })
        } catch(error) {
            throw new Error(`Some think went wrong`);
        }
    }

    public static async getCar(
        request: Request,
        response: Response,
    ): Promise<void> {
        try {
            const { carId } = request.params;

            if(!(typeof carId === 'string')) {
                throw new Error("Invalid car ID");
            };

            const car = await carService.getCarById(carId);

            sendSuccess(response, {
                message: "Car fetched succesfully",
                meta: car,
            });
        } catch(error) {
            throw new Error(`Some think went wrong`);
        }
    }

    public static async getAllCars(
        request: Request,
        response: Response,
    ): Promise<void> {
        try {
            const cars = await carService.getAllCars();

            sendSuccess(response, {
                message: "Cars fetched succesfully",
                meta: cars,
            });
        } catch(error) {
            throw new Error(`Some think went wrong`);
        }
    }
}

export default CarController