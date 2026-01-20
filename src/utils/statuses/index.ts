export enum HTTPStatusCode {
    OK = 200,
    CREATED = 201,
    NOT_CONTENT = 204,

    BAD_REQUEST = 400,

    INTERNAL_SERVER_ERROR = 500,
}

export enum ResponseMessage {
    CAR_ENTITY_CREATED = 'Car entity created successfully',
    CAR_ENTITY_GETTED_BY_ID = 'Car entity getted by id successfully',
    CAR_ENTITY_DELETED_BY_ID = 'Car entity deleted by id successfully',
    CARS_ENTITIES_GETTED = 'Cars etities getted successfully',
    CAR_ENTITY_UPDATED = 'Car entity updated successfully',
}

export enum ErrorCode {
    INTERNAL = "INTERNAL",
    CAR_INPUT_INVALID = "CAR_INPUT_INVALID",
}

export enum ErrorMessage {
    INTERNAL = "Internal server error",
    CAR_INPUT_INVALID = "Car entity payload is invalid",
}