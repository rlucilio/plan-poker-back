import express, { Express, Router } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { BaseClass } from "../model/base-class";
import { SessionController } from "./session/entrypoint/session.controller";

export class WebServer extends BaseClass {
    private _serve: Express = express();
    private sessionController = new SessionController();

    constructor() {
        super();
    }

    private createMiddlewares() {
        this.log.info("Init middlewares");
        this.serve.use(morgan("dev"));
        this.serve.use(bodyParser.urlencoded({ extended: false }))
        this.serve.use(bodyParser.json())
    }

    private createRoutes() {
        this.log.info(`Init routes`);
        this.serve.use("/session", this.sessionController.route)
    }

    get serve(): Express {
        return this._serve;
    }

    initWebServer() {
        this.createMiddlewares();
        this.createRoutes();
    }
}