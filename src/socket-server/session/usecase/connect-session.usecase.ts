import { Socket } from "socket.io";
import { ErrorBase } from "../../../web-server/error/error-base";
import { ErrorTypes } from "../../../web-server/error/error-types";
import { ISaveSessionEntity } from "../../../web-server/session/usecase/model/save-session.entity";
import cacheManager from "../../../cache/cache-manager";
import { VerifyConnectionSession } from "./verify-connection-session.usecase";
import { IConnectSessionModel } from "./model/connect-session.model";

export class ConnectSessionUsecase {
    private cache = cacheManager;

    constructor() { }

    execute(socket: Socket){
        const model: IConnectSessionModel = {
            session: socket.handshake.query.session,
            user: socket.handshake.query.user
        }

        const session = this.cache.get<ISaveSessionEntity>(model.session)

        if (!session)
            throw new ErrorBase("Session invalid", ErrorTypes.Params, {model, session});
            
        socket.join(session?.session.name);
        new VerifyConnectionSession().execute(session, model);
    }
}