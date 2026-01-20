import { ErrorCode, ErrorMessage, HTTPStatusCode } from "./../../utils/statuses";
import { HTTPError } from "./../../utils/errors/HTTPError";
import { Car } from "./../../models/car.model";
import { ICar } from "./../../domains/Car";
import { sequelize } from "./../../models";
import { Transaction } from "sequelize";

export interface ICreateCarInput {
    brand: string;
    model: string;
    year_of_release: number;
    cost: number;
}

export interface IUpdateCarInput {
    carId: string;
    brand?: string;
    model?: string;
    year_of_release?: number;
    cost?: number;
}

export class CarService {
    public async createCar(payload: ICreateCarInput): Promise<ICar> {
        return sequelize.transaction(async (transaction: Transaction) => {
            const car = await Car.create(
                {
                    brand: payload.brand,
                    model: payload.model,
                    year_of_release: payload.year_of_release,
                    cost: payload.cost,
                },
                { transaction }
            );

            return car.get({ plain: true }) as ICar;
        });
    }

    public async getCarByIdById(carId: string): Promise<ICar> {
        const car = await Car.findByPk(carId);

        if (!car) {
            throw new HTTPError(
                HTTPStatusCode.NO_CONTENT,
                ErrorMessage.CAR_ENTITY_NOT_FOUND,
                ErrorCode.CAR_ENTITY_NOT_FOUND,
            );
        }

        return car.get({ plain: true }) as ICar;
    }

    public async deleteCarById(carId: string): Promise<void> {
        const car = await Car.findByPk(carId);

        if (!car) {
            throw new HTTPError(
                HTTPStatusCode.NO_CONTENT,
                ErrorMessage.CAR_ENTITY_NOT_FOUND,
                ErrorCode.CAR_ENTITY_NOT_FOUND,
            );
        }

        await car.destroy();
    }

    public async getAllCars(): Promise<ICar[]> {
        const cars = await Car.findAll();

        if (!cars) {
            throw new HTTPError(
                HTTPStatusCode.NO_CONTENT,
                ErrorMessage.CARS_ENTITIES_NOT_FOUND,
                ErrorCode.CARS_ENTITIES_NOT_FOUND,
            );
        }

        return cars.map((car) => car.get({ plain: true }) as ICar);
    }

    public async updateCarById(payload: IUpdateCarInput): Promise<ICar> {
        const car = await Car.findByPk(payload.carId);
        
        if (!car) {
            throw new HTTPError(
                HTTPStatusCode.NO_CONTENT,
                ErrorMessage.CAR_ENTITY_NOT_FOUND,
                ErrorCode.CAR_ENTITY_NOT_FOUND,
            );
        }

        const updates: Partial<Car> = Object.fromEntries(Object.entries(payload).filter(([_,value]) => value !== undefined));

        await car.update(updates);

        return car.get({plain: true}) as ICar;
    }
}
