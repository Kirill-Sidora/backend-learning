export interface ICar {
    id: string;
    brand: string;
    model: string;
    year_of_release: number;
    cost: number;
    createdAt?: Date;
    updatedAt?: Date;
}