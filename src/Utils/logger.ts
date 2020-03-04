
import * as aLogger from 'loglevel';

export class Logger {

    constructor() {
        aLogger.setLevel(aLogger.levels.DEBUG, true);
    }

    log(message?: any, ...optionalParams: any[]) {
        aLogger.debug(message, ...optionalParams);
    }

    trace(message?: any, ...optionalParams: any[]) {
        aLogger.trace(message, ...optionalParams);
    }

    debug(message?: any, ...optionalParams: any[]) {
        aLogger.trace(message, ...optionalParams);
    }

    info(message?: any, ...optionalParams: any[]) {
        aLogger.info(message, ...optionalParams);
    }

    warn(message?: any, ...optionalParams: any[]) {
        aLogger.warn(message, ...optionalParams);
    }
    error(message?: any, ...optionalParams: any[]) {
        aLogger.error(message, ...optionalParams);
    }

    
}
const logger = new Logger();
export default logger;