import { ErrorCode, ErrorMessage, HTTPStatusCode } from "./../../utils/statuses";
import { isNumber, isString } from "./../../utils/validators";
import { HTTPError } from "./../../utils/errors/HTTPError";
import { ICar } from "./../../domains/Car";

export const carEntityPayloadChecker = (car: ICar): void => {
    const { brand, model, year_of_release, cost } = car;

    const isPayloadValid: boolean = isString(brand) || isString(model) || isNumber(year_of_release) || isNumber(cost);

    if(!isPayloadValid) {
        throw new HTTPError(
            HTTPStatusCode.BAD_REQUEST,
            ErrorMessage.CAR_INPUT_INVALID,
            ErrorCode.CAR_INPUT_INVALID,
        )
    }

    const isBrandValid: boolean = isString(brand) && !!brand;

    if(!isBrandValid) {
        throw new HTTPError(
            HTTPStatusCode.BAD_REQUEST,
            ErrorMessage.CAR_INPUT_BRAND_INVALID,
            ErrorCode.CAR_INPUT_BRAND_INVALID,
        )
    }

    const isModelValid: boolean = isString(model) && !!model;

    if (!isModelValid) {
        throw new HTTPError(
            HTTPStatusCode.BAD_REQUEST,
            ErrorMessage.CAR_INPUT_MODEL_INVALID,
            ErrorCode.CAR_INPUT_MODEL_INVALID,
        )
    }

    const isYearOfReleaseValid: boolean = isNumber(year_of_release) && !!year_of_release;

    if (!isYearOfReleaseValid) {
        throw new HTTPError(
            HTTPStatusCode.BAD_REQUEST,
            ErrorMessage.CAR_INPUT_YEAR_OF_RELEASE_INVALID,
            ErrorCode.CAR_INPUT_YEAR_OF_RELEASE_INVALID,
        )
    }

    const isCostValid: boolean = isNumber(cost) && !!cost;

    if (!isCostValid) {
        throw new HTTPError(
            HTTPStatusCode.BAD_REQUEST,
            ErrorMessage.CAR_INPUT_COST_INVALID,
            ErrorCode.CAR_INPUT_COST_INVALID,
        )
    }
}