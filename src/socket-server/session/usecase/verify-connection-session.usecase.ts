import { IConnectSessionModel } from "./model/connect-session.model";
import { ISaveSessionEntity } from "../../../web-server/session/usecase/model/save-session.entity";
import socketServer from "../../socket-server";
import cacheManager from "../../../cache/cache-manager";

export class VerifyConnectionSession {
    constructor() { }

    execute(session: ISaveSessionEntity, model: IConnectSessionModel) {
        
        if (session.users.find(user => user.name === model.user)) {
            socketServer.socket?.in(session.session.name)
                .emit("join_room", {
                    msg: "Entrou na sala",
                    user: model.user
                })
        } else {
            socketServer.socket?.in(session.session.name)
                .emit("return_room", {
                    msg: "Novo membro na sala",
                    user: model.user
                })

            session.users.push({
                name: model.user
            })

            cacheManager.set(session.session.name, session)
        }
    }
}