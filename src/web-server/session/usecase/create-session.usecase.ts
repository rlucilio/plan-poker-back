import { ICreateSessionModel } from "./model/create-session.model";
import { ErrorBase } from "../../error/error-base";
import { ErrorTypes } from "../../error/error-types";

export class CreateSessionUsecase {
    constructor() { }

    execute(model: ICreateSessionModel) {
        if (model && !model.name && !model.owner)
            throw new ErrorBase("Request body invalid", ErrorTypes.Params, model)

        
    }
}