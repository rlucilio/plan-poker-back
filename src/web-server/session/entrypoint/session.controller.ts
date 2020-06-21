import { Router, Request, Response } from "express";
import { CreateSessionUsecase } from "../usecase/create-session.usecase";
import { BaseClass } from "../../../model/base-class";
import { FindSessionUsecase } from "../usecase/find-session.usecase";

export class SessionController extends BaseClass {
    private createSessionUsecase = new CreateSessionUsecase();
    private findSessionUsecase = new FindSessionUsecase();
    private routerManager = Router();

    constructor() {
        super();
    }

    get route() {
        this.createSession()
        this.verifyExistSession();
        return this.routerManager
    }

    private createSession() {
        this.routerManager.post("/", (req: Request, res: Response) => {
            this.log.info(`Request body -> ${JSON.stringify(req.body)}`);

            try {
                const response = this.createSessionUsecase.execute(req.body);
                this.log.info(`Response ${JSON.stringify(response)}`);
                res.status(200).json(response);
            }
            catch (error) {
                this.log.error(`Erro in request -> ${JSON.stringify(error)}`)
                res.status(400).json(error);
            }
        });
    }

    private verifyExistSession() {
        this.routerManager.get('/find/:name', (request: Request, response: Response) => {
            this.log.info(`Request body -> ${request.params.name}`);

            try {
                const res = this.findSessionUsecase.execute(request.params.name);
                this.log.info(`Response ${JSON.stringify(res)}`);
                response.status(200).json(res);
            }
            catch (error) {
                this.log.error(`Erro in request -> ${JSON.stringify(error)}`)
                response.status(400).json(error);
            }
        })
    }
}