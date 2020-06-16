import { Router, Request, Response } from "express";
import { CreateSessionUsecase } from "../usecase/create-session.usecase";
import { BaseClass } from "../../../model/base-class";

export class SessionController extends BaseClass {
    private createSessionUsecase = new CreateSessionUsecase();
    private routerManager = Router();

    constructor() {
        super();
    }

    get route() {
        this.createSession()
        return this.routerManager
    }

    private createSession() {
        this.routerManager.post("/", (req: Request, res: Response) => {
            this.log.info(`Request body -> ${JSON.stringify(req.body)}`);

            try {
                const response = this.createSessionUsecase.execute(req.body);
                this.log.info(`Response ${JSON.stringify(response)}`);
                res.status(200).send(response);
            }
            catch (error) {
                this.log.error(`Erro in request => ${error}`);
                res.status(400).send(error);
            }
        });
    }
}