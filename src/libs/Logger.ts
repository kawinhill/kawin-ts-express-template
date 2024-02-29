import winston from "winston";

// LOG LEVEL var
export enum LogLevel {
    INFO = "info",
    ERROR = "error",
    WARN = "warn",
    VERBOSE = "verbose",
    DEBUG = "debug",
    SILLY = "silly",
}

class Logger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: "warn",
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: "logs.log" }),
            ],
        });
    }

    log(level: LogLevel = LogLevel.INFO, message: string): void {
        this.logger.log({
            level,
            message,
        });
    }
}

// export instance of Logger
export default new Logger();
