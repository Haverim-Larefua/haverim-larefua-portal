export enum REST_SATATUS {
    OK = 200,
    OK_CREATED = 201,
    OK_DELETED = 204,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
}


export enum ROLES {
    // OTHER = 'other',
    // FLEX_FORCE = 'flex-force',
    SOURCING = 'it',
    // PIT_CREW = 'PIT-CREW',
    FINANCE = 'finance',
    ADMIN = 'admin',
}

export enum HTTP_VERBS {
    GET = 'get',
    PUT = 'put',
    POST = 'post',
    DELETE = 'delete',
    PATCH = 'patch',
}
