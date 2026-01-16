import { sendSuccess } from './../../utils/response';
import { CarService } from "../../services/Car";
import { Request, Response } from 'express';


const eventService = new CarService();

class CarController {
    public static async createCar(
        request: Request,
        response: Response,
    ): Promise<void> {
        try {
            const { brand, model, year_of_release, cost } = request.body;

            const car = await eventService.createCar({
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
}

export default CarController