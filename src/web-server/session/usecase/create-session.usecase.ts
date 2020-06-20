import { ICreateSessionModel } from "./model/create-session.model";
import { ErrorBase } from "../../error/error-base";
import { ErrorTypes } from "../../error/error-types";
import { ISaveSessionEntity } from "./model/save-session.entity";
import cacheManager from "../../../cache/cache-manager";


export class CreateSessionUsecase {
    private myCache = cacheManager;

    constructor() { }

    execute(model: ICreateSessionModel) {
        if (!model || !model.name || !model.owner)
            throw new ErrorBase("Request body invalid", ErrorTypes.Params, model);  

        const newSession: ISaveSessionEntity = {
            session: {
                name: model.name.replace(/ /g, "_"),
                ownerName: model.owner
            },
            users: [
                { name: model.owner }
            ]
        }

        if (this.myCache.get(newSession.session.name))
            throw new ErrorBase("There is already a room with that name", ErrorTypes.Role, model);  

        newSession.session.expireInSeconds = +(process.env.expire_room || 1800);
        this.myCache.set(newSession.session.name, newSession);
        return newSession.session
    }
}