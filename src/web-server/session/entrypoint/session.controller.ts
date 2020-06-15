import { Router, Request, Response } from "express";
import { CreateSessionUsecase } from "../usecase/create-session.usecase";
import { BaseClass } from "../../../model/base-class";

export class SessionController extends BaseClass {
    private createSessionUsecase = new CreateSessionUsecase();
    constructor() {
        super();
    }

    get route() {
        return Router().post("/", (req: Request, res: Response) => {
            this.log.info(`Request body -> ${JSON.stringify(req.body)}`);

            try {
            
                res.status(200).send(this.createSessionUsecase.execute(req.body));
                
            } catch (error) {
                res.status(400).send(error)
            }
        })
    }
}