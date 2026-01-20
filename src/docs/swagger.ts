import swaggerJsdoc from "swagger-jsdoc";
import { swaggerConfig } from "./../utils/configs/swagger";

export const swaggerSpecification = swaggerJsdoc(swaggerConfig);