import express from 'express';
import cors from 'cors';
import Environment from '../providers/Enviroments';
import Logger, { LogLevel } from '../libs/Logger';
import Routes from './Routes';
import * as OpenApiValidator from "express-openapi-validator";


class Express {
    public server: any;
    public express: express.Application;

    constructor() {
        this.server = null;
        this.express = express();
    }

    public init(): void {
        this.mountMiddlewares();
        this.mountRoutes();
        // this.express = this.express.use(ExpressException.errorLogger);

        this.server = this.express.listen(
            Environment.get().WEB_PORT,
            Environment.get().WEB_HOST,
            () => {
                Logger.log(
                    LogLevel.INFO,
                    `Express Webserver listening at ${
                        Environment.get().WEB_HOST
                    }:${Environment.get().WEB_PORT}`
                );
            }
        );
    }

    public end(): void {
        if (this.server) this.server.close();
    }

    private mountRoutes(): void {
        this.express = Routes.mountAPI(this.express);
        this.express = Routes.mountWeb(this.express);
    }

    private mountMiddlewares(): void {
        //this.express = RateLimit.init(this.express);
        this.express = this.express.use(cors());

        this.express = this.express.use(express.json());

        this.express.use(
            OpenApiValidator.middleware({
                apiSpec: "./docs/openapi.yaml",
                validateRequests: true,
                validateResponses: true,
            })
        );
        
        this.express.use((err:any, req:any, res:any, next:any) => {
            // format error
            res.status(err.status || 500).json({
                message: err.message,
                errors: err.errors,
            });
        });

    }
}

export default new Express();
