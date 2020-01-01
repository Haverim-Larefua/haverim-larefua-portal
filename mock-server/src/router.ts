import { Router } from 'express';
import { Request, Response, Router as CoreRouter } from 'express-serve-static-core';
import { REST_SATATUS, ROLES, HTTP_VERBS } from './enum';

const router: CoreRouter = Router();

const args = process.argv.slice(2);

function setRoute(verb: HTTP_VERBS, url: string, filePath: string, timeOut: number = 0, status: REST_SATATUS = REST_SATATUS.OK) {
    router[verb](url, async (req: Request, res: Response) => {
        console.log(`\n ${req.method} ${req.url} ${status} \n`);
        const data = await import(`./api/${filePath}.json`);
        setTimeout(() => {
            res.status(status);
            res.json(data);
        }, timeOut);
    });
}

function chooseResourceByRole(roles: Array<string>, baseRoute: string) {
    const role = getRole(roles);
    if (role) {
        return `${baseRoute}${role}`;
    }
    return `${baseRoute}admin`;
}

function roleView(roles: Array<string>) {
    const role = getRole(roles);
    if (role && role !== 'none') {
        console.log(`\n ********* User role is: ${role} ********* \n`);
        return;
    }
    console.log(`\n ********* User role is Admin(default)  ********* \n`);
}

function getRole(roles: Array<string>) {
    const roleArray = roles[0];
    if (roleArray) {
        let role: string = roleArray.split('=')[1];
        if (Object.values(ROLES).includes(role)) {
            return role;
        }
    }
    return null;
}

roleView(args);

//packages
setRoute(HTTP_VERBS.GET, '/api/packages', 'packages/packages');

//users
setRoute(HTTP_VERBS.GET, '/api/notifications/getTimelineNotification', 'notifications/get-timeline-notification');


export default router;
