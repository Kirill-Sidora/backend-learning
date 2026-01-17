import { applicationConfig } from "./application";
import { Paths } from "./../../utils/constants/app";
import { Options } from "swagger-jsdoc";

const successCreateCarEntitySchema = {
    type: "object",
    properties: {
        brand: { type: "string", example: "BMW" },
        model: { type: "string", example: "X6" },
        year_of_release: { type: "number", example: 2005 },
        cost: { type: "number", example: 1999999 },
    },
    require: ["brand", "model", "year_of_release", "cost"],
};

const definition = {
    openapi: "3.0.3",
    info: {
        title: "backend-learning",
        version: "1.0.0",
        description:
            "API documentation for the Backend Learning backend template",
    },
    servers: [
        {
            url: `http://localhost:${applicationConfig.port}`,
            description: "Local development server",
        },
    ],
    tags: [
        { name: "Health", description: "Health check endpoint" },
        { name: "Car", description: "Car endpoints" },
    ],
    components: {
        schemas: {
            CarEntity: {
                type: 'object',
                properties: {
                    carId: { type: 'string', format: 'uuid' },
                    brand: { type: 'string' },
                    model: { type: 'string' },
                    year_of_release: { type: 'number' },
                    cost: { type: 'number' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
                required: [
                    'carId',
                    'brand',
                    'model',
                    'year_of_release',
                    'cost',
                    'createdAt',
                    'updatedAt',
                ],
            },
            CarCreateRequest: {
                 
            }
        }
    },
    externalDocs: {
        description: `Swagger UI exponsed under ${Paths.DOCS_PATH}`,
        url: Paths.DOCS_PATH,
    },
};

export const swaggerConfig: Options = {
    definition,
    apis: ["src/routes/**/*.ts"],
};
