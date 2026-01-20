import { ErrorCode, ErrorMessage, HTTPStatusCode, ResponseMessage } from './../../utils/statuses';
import { carEntityPayloadChecker } from './../../utils/handlers';
import { isNumber, isString } from './../../utils/validators';
import { HTTPError } from './../../utils/errors/HTTPError';
import { NextFunction, Request, Response } from 'express';
import { sendSuccess } from './../../utils/response';
import { CarService } from "../../services/Car";
import { ICar } from './../../domains/Car';

const carService = new CarService();

class CarController {
    public static async createCar(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            carEntityPayloadChecker(request.body);
            
            const { brand, model, year_of_release, cost } = request.body;

            const car = await carService.createCar({
                brand: brand,
                model: model,
                year_of_release: year_of_release,
                cost: cost,
            })

            sendSuccess(response, {
                message: ResponseMessage.CAR_ENTITY_CREATED,
                meta: car,
                statusCode: HTTPStatusCode.CREATED,
            })
        } catch(error) {
            next(error);
        }
    }

    public static async getCarById(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            carEntityPayloadChecker(request.body);

            const { carId } = request.params;

            const normalizedCarId: string = isString(carId) ? carId.trim() : '';

            if(!normalizedCarId) {
                throw new HTTPError(
                    HTTPStatusCode.BAD_REQUEST,
                    ErrorMessage.CAR_INPUT_INVALID,
                    ErrorCode.CAR_INPUT_INVALID
                )
            }

            const car = await carService.getCarByIdById(normalizedCarId);

            sendSuccess(response, {
                message: ResponseMessage.CAR_ENTITY_GETTED_BY_ID,
                meta: car,
                statusCode: HTTPStatusCode.OK,
            });
        } catch(error) {
            next(error);
        }
    }

    public static async deleteCarById(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            carEntityPayloadChecker(request.body);

            const { carId } = request.params;

            const normalizedCarId: string = isString(carId) ? carId.trim() : '';

            if(!normalizedCarId) {
                throw new HTTPError(
                    HTTPStatusCode.BAD_REQUEST,
                    ErrorMessage.CAR_INPUT_INVALID,
                    ErrorCode.CAR_INPUT_INVALID
                )
            }

            await carService.deleteCarById(normalizedCarId);

            sendSuccess(response, {
                message: ResponseMessage.CAR_ENTITY_DELETED_BY_ID,
                statusCode: HTTPStatusCode.NO_CONTENT,
            });
        } catch(error) {
            next(error);
        };
    }

    public static async getAllCars(
        _request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const cars = await carService.getAllCars();

            sendSuccess(response, {
                message: ResponseMessage.CARS_ENTITIES_GETTED,
                meta: cars,
                statusCode: HTTPStatusCode.OK,
            });
        } catch(error) {
            next(error);
        }
    }

    public static async updateCarById(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            carEntityPayloadChecker(request.body);

            const { carId } = request.params;

            const normalizedCarId = isString(carId) ? carId.trim() : '';

            const body = request.body ?? {};

            const hasProp = (key: string): boolean => Object.prototype.hasOwnProperty.call(body, key);

            let hasUpdates: boolean = false;

            const payload: {
                brand?: string;
                model?: string;
                year_of_release?: number;
                cost?: number
            } = {};

            if(hasProp('brand')) {
                if(!isString(body.brand)) {
                    throw new HTTPError(
                        HTTPStatusCode.BAD_REQUEST,
                        ErrorMessage.CAR_INPUT_INVALID,
                        ErrorCode.CAR_INPUT_INVALID,
                    );
                }

                payload.brand = body.brand;

                hasUpdates = true;
            }

            if(hasProp('model')) {
                if(!isString(body.model)) {
                    throw new HTTPError(
                        HTTPStatusCode.BAD_REQUEST,
                        ErrorMessage.CAR_INPUT_INVALID,
                        ErrorCode.CAR_INPUT_INVALID,
                    );
                }
                
                payload.model = body.model;

                hasUpdates = true;
            }

            if(hasProp('year_of_release')) {
                if(!isNumber(body.year_of_release)) {
                    throw new HTTPError(
                        HTTPStatusCode.BAD_REQUEST,
                        ErrorMessage.CAR_INPUT_INVALID,
                        ErrorCode.CAR_INPUT_INVALID,
                    );
                }

                payload.year_of_release = body.year_of_release;

                hasUpdates = true;
            }

            if(hasProp('cost')) {
                if(!isNumber(body.cost)) {
                    throw new HTTPError(
                        HTTPStatusCode.BAD_REQUEST,
                        ErrorMessage.CAR_INPUT_INVALID,
                        ErrorCode.CAR_INPUT_INVALID,
                    );
                }

                payload.cost = body.cost;

                hasUpdates = true;
            }

            if(!hasUpdates) {
                throw new HTTPError(
                    HTTPStatusCode.BAD_REQUEST,
                    ErrorMessage.CAR_INPUT_INVALID,
                    ErrorCode.CAR_INPUT_INVALID,
                );
            }

            const car: ICar = await carService.updateCarById({
                carId: normalizedCarId,
                ...payload
            })

            sendSuccess(response, {
                message: ResponseMessage.CAR_ENTITY_UPDATED,
                meta: car,
                statusCode: HTTPStatusCode.OK,
            })
        } catch(error) {
            next(error);
        }
    }
}

export default CarController