import { ICreateSessionModel } from "./model/create-session.model";
import { ErrorBase } from "../../error/error-base";
import { ErrorTypes } from "../../error/error-types";
import { ISaveSessionEntity } from "./model/save-session.entity";
import cacheManager from "../../../cache/cache-manager";


export class CreateSessionUsecase {
    private myCache = cacheManager;

    constructor() { }

    execute(model: ICreateSessionModel) {
        if (!model || !model.name)
            throw new ErrorBase("Request body invalid", ErrorTypes.Params, model);  

        const newSession: ISaveSessionEntity = {
            session: {
                name: `session_${model.name}`,
                ownerName: model.owner
            },
            users: [
                { name: model.owner }
            ]
        }

        newSession.session.expireInSeconds = 1800;
        this.myCache.set(newSession.session.name, newSession);
        
        return newSession.session
    }
}