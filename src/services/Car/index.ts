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
        const event = await Car.findByPk(carId);

        if (!event) {
            throw new Error("Car not found");
        }

        return event.get({ plain: true }) as ICar;
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

        const updates: Partial<Car> = {};

        if (payload.brand !== undefined) {
            updates.brand = payload.brand;
        }

        if (payload.model !== undefined) {
            updates.model = payload.model;
        }

        if (payload.year_of_release !== undefined) {
            updates.year_of_release = payload.year_of_release;
        }

        if (payload.cost !== undefined) {
            updates.cost = payload.cost;
        }

        await car.update(updates);

        return car.get({plain: true}) as ICar;
    }
}
