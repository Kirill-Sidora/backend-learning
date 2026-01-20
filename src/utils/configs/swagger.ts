import { Paths } from "./../../utils/constants/app";
import { applicationConfig } from "./application";
import { Options } from "swagger-jsdoc";

const successResponseSchema = {
    type: "object",
    properties: {
        ok: {
            type: "boolean",
            example: true,
        },
        message: {
            type: "string",
            example: "Request completed successfully",
        },
        meta: {
            oneOf: [
                { type: "object" },
                { type: "array", items: {} },
                { type: null },
            ],
        },
    },
    required: ["ok", "message", "meta", "tockens"],
};

const errorResponseSchema = {
    type: 'object',
    properties: {
        ok: {
            type: 'boolean', exmple: 'false',
        },
        error: {
            type: 'object',
            properties: {
                code: { type: 'string', example: "UNAUTHORIZED" },
                message: { type: 'string', example: "Unauthorized" },
            },
            required: [ 'code', 'message' ],
        },
    },
    required: [ 'ok', 'error' ],
}

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
            SuccessResponse: successResponseSchema,
            ErrorResponse: errorResponseSchema,
            CarEntity: {
                type: "object",
                properties: {
                    carId: { type: "string", format: "uuid" },
                    brand: { type: "string" },
                    model: { type: "string" },
                    year_of_release: { type: "number" },
                    cost: { type: "number" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
                required: [
                    "carId",
                    "brand",
                    "model",
                    "year_of_release",
                    "cost",
                    "createdAt",
                    "updatedAt",
                ],
            },
            CarCreateRequest: {
                type: "object",
                properties: {
                    brand: {
                        type: "string",
                        example: "BMW",
                    },
                    model: {
                        type: "string",
                        example: "X6",
                    },
                    year_of_release: {
                        type: "number",
                        example: "2007",
                    },
                    cost: {
                        type: "number",
                        example: "1999999",
                    },
                },
                required: ["brand", "model", "year_of_release", "cost"],
            },
            CarUpdateRequest: {
                type: 'object',
                properties: {
                    brand: {
                        type: 'string',
                    },
                    model: {
                        type: 'string',
                    },
                    year_of_release: {
                        type: 'number',
                    },
                    cost: {
                        type: 'number',
                    },
                },
            },
            CarCreateResponse: {
                allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                        properties: {
                            meta: {
                                $ref: "#/components/schemas/CarEntity",
                            },
                        },
                    },
                ],
            },
            CarRequestEntity: {
                type: "object",
                properties: {
                    carId: {
                        type: "string",
                        format: "uuid",
                    },
                    brand: {
                        type: "string",
                    },
                    model: {
                        type: "string",
                    },
                    year_of_release: {
                        type: "number",
                    },
                    cost: {
                        type: "number",
                    },
                },
                required: [
                    "carId",
                    "brand",
                    "model",
                    "year_of_release",
                    "cost",
                ],
            },
            CarResponse: {
                allOf: [
                    { $ref: '#/components/schemas/SuccessResponse' },
                    {
                        properties: {
                            meta: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/CarEntity'},
                            },
                        },
                    },
                ],
            },
        },
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
