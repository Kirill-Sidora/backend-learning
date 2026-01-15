import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ICar } from "domains/Car";

export interface ICarCreationAttributes
    extends Optional<ICar, "id" | "createdAt" | "updatedAt"> {}

export class Car extends Model<ICar, ICarCreationAttributes> {
    public id!: string;
    public brand!: string;
    public model!: string;
    public year_of_release!: number;
    public cost!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export const initCarModel = (sequelize: Sequelize): typeof Car => {
    Car.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            year_of_release: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            cost: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "car",
            timestamps: true,
        }
    );

    return Car;
};
