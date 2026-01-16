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
}
