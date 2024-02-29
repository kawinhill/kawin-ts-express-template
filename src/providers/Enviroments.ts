import Logger from "../libs/Logger";

const requiredENV = [
    "WEB_PORT",
    "WEB_HOST",
    "NODE_ENV",
    // "DB_HOST",
    // "DB_PORT",
    // "DB_USER",
    // "DB_PASS",
    // "DB_NAME",
];

class Environment {
    public init(): void {
        for (let param of requiredENV) {
            if (this.isUndefinedOrEmpty(process.env[param])) throw new Error(`.env ${param} is undefined`);
        }
        // check port is a number
        if (isNaN(Number(process.env.WEB_PORT))) throw new Error(`.env WEB_PORT is not a number`);
    }
    public get(): any {
        return {
            WEB_PORT: process.env.WEB_PORT,
            WEB_HOST: process.env.WEB_HOST,
            NODE_ENV: process.env.NODE_ENV,
            // DB_HOST: process.env.DB_HOST,
            // DB_PORT: process.env.DB_PORT,
            // DB_USER: process.env.DB_USER,
            // DB_PASS: process.env.DB_PASS,
            // DB_NAME: process.env.DB_NAME,
        };
    }
    private isUndefinedOrEmpty(value: String | undefined): boolean {
        if (typeof value === 'undefined') return true;

        if (value === undefined) return true;

        if (value === '') return true;

        return false;
    }
}

export default new Environment();