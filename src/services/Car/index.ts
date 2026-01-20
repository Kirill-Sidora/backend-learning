import { Car } from "./../../models/car.model";
import { isString } from "utils/validators";
import { ICar } from "./../../domains/Car";
import { sequelize } from "./../../models";
import { Transaction } from "sequelize";
import { HTTPStatusCode } from "utils/statuses";

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
            throw new Error("Car entity not found");
        }

        return car.get({ plain: true }) as ICar;
    }

    public async deleteCarById(carId: string): Promise<void> {
        const car = await Car.findByPk(carId);

        if(!car) {
            throw new Error("Car entity not found");
        }    

        await car.destroy();
    }

    public async getAllCars(): Promise<ICar[]> {
        const cars = await Car.findAll();

        if (!cars) {
            throw new Error("No cars found");
        }

        return cars.map((car) => car.get({ plain: true }) as ICar);
    }

    public async updateCarById(payload: IUpdateCarInput): Promise<ICar> {
        const car = await Car.findByPk(payload.carId);

        if (!car) {
            throw new Error("Car entity not found");
        }

        const updates: Partial<Car> = Object.fromEntries(Object.entries(payload).filter(([_,value]) => value !== undefined));

        await car.update(updates);

        return car.get({plain: true}) as ICar;
    }
}
