"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enum_1 = require("./enum");
const router = express_1.Router();
const args = process.argv.slice(2);
function setRoute(verb, url, filePath, timeOut = 0, status = enum_1.REST_SATATUS.OK) {
    router[verb](url, async (req, res) => {
        console.log(`\n ${req.method} ${req.url} ${status} \n`);
        const data = await Promise.resolve().then(() => __importStar(require(`./api/${filePath}.json`)));
        setTimeout(() => {
            res.status(status);
            res.json(data);
        }, timeOut);
    });
}
function chooseResourceByRole(roles, baseRoute) {
    const role = getRole(roles);
    if (role) {
        return `${baseRoute}${role}`;
    }
    return `${baseRoute}admin`;
}
function roleView(roles) {
    const role = getRole(roles);
    if (role && role !== 'none') {
        console.log(`\n ********* User role is: ${role} ********* \n`);
        return;
    }
    console.log(`\n ********* User role is Admin(default)  ********* \n`);
}
function getRole(roles) {
    const roleArray = roles[0];
    if (roleArray) {
        let role = roleArray.split('=')[1];
        if (Object.values(enum_1.ROLES).includes(role)) {
            return role;
        }
    }
    return null;
}
roleView(args);
//packages
setRoute(enum_1.HTTP_VERBS.GET, '/api/lookup/currentUser', chooseResourceByRole(args, 'lookup/current-user-'));
//users
setRoute(enum_1.HTTP_VERBS.GET, '/api/notifications/getTimelineNotification', 'notifications/get-timeline-notification');
exports.default = router;
