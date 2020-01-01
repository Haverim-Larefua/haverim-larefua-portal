"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REST_SATATUS;
(function (REST_SATATUS) {
    REST_SATATUS[REST_SATATUS["OK"] = 200] = "OK";
    REST_SATATUS[REST_SATATUS["OK_CREATED"] = 201] = "OK_CREATED";
    REST_SATATUS[REST_SATATUS["OK_DELETED"] = 204] = "OK_DELETED";
    REST_SATATUS[REST_SATATUS["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    REST_SATATUS[REST_SATATUS["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    REST_SATATUS[REST_SATATUS["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    REST_SATATUS[REST_SATATUS["FORBIDDEN"] = 403] = "FORBIDDEN";
    REST_SATATUS[REST_SATATUS["NOT_FOUND"] = 404] = "NOT_FOUND";
    REST_SATATUS[REST_SATATUS["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    REST_SATATUS[REST_SATATUS["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(REST_SATATUS = exports.REST_SATATUS || (exports.REST_SATATUS = {}));
var ROLES;
(function (ROLES) {
    // OTHER = 'other',
    // FLEX_FORCE = 'flex-force',
    ROLES["SOURCING"] = "it";
    // PIT_CREW = 'PIT-CREW',
    ROLES["FINANCE"] = "finance";
    ROLES["ADMIN"] = "admin";
})(ROLES = exports.ROLES || (exports.ROLES = {}));
var HTTP_VERBS;
(function (HTTP_VERBS) {
    HTTP_VERBS["GET"] = "get";
    HTTP_VERBS["PUT"] = "put";
    HTTP_VERBS["POST"] = "post";
    HTTP_VERBS["DELETE"] = "delete";
    HTTP_VERBS["PATCH"] = "patch";
})(HTTP_VERBS = exports.HTTP_VERBS || (exports.HTTP_VERBS = {}));
//# sourceMappingURL=enum.js.map