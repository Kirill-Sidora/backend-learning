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

    public static async getCarById(
        request: Request,
        response: Response,
    ): Promise<void> {
        try {
            const { carId } = request.params;

            if(!(typeof carId === 'string')) {
                throw new Error("Invalid car ID");
            };

            const car = await carService.getCarByIdById(carId);

            sendSuccess(response, {
                message: "Car fetched succesfully",
                meta: car,
                statusCode: 200,
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
                statusCode: 200,
            });
        } catch(error) {
            throw new Error(`Some think went wrong`);
        }
    }

    public static async updateCarById(
        request: Request,
        response: Response,
    ): Promise<void> {
        try {
            const { carId } = request.params;

            const normalizedCarId = (typeof carId === 'string') ? carId.trim() : '';

            if(!(typeof carId === 'string')) {
                throw new Error("Invalid prop 'carId'");
            }

            const body = request.body ?? {};

            const hasProp = (key: string) => Object.prototype.hasOwnProperty.call(body, key);

            let hasUpdates = false;

            const payload: {
                brand?: string;
                model?: string;
                year_of_release?: number;
                cost?: number
            } = {};

            if(hasProp('brand')) {
                if(!(typeof body.brand === 'string')) {
                    throw new Error(`Prop 'brand' must have type string`);
                }

                payload.brand = body.brand;

                hasUpdates = true;
            }

            if(hasProp('model')) {
                if(!(typeof body.model === 'string')) {
                    throw new Error("Prop 'model' must have type string")
                }
                
                payload.model = body.model;

                hasUpdates = true;
            }

            if(hasProp('year_of_release')) {
                if(!(typeof body.year_of_release === 'number')) {
                    throw new Error("Prop 'year_of_release' must have type number")
                }

                payload.year_of_release = body.year_of_release;

                hasUpdates = true;
            }

            if(hasProp('cost')) {
                if(!(typeof body.cost === 'number')) {
                    throw new Error("Prop 'cost' must have type number")
                }

                payload.cost = body.cost;

                hasUpdates = true;
            }

            if(!hasUpdates) {
                throw new Error("Invalid input props");
            }

            const car = await carService.updateCarById({
                carId: normalizedCarId,
                ...payload
            })

            sendSuccess(response, {
                message: "Car updated succesfuly",
                meta: car,
                statusCode: 200,
            })
        } catch(error) {
            throw new Error(error as string);
        }
    }
}

export default CarController