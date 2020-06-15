import http from "http";
import socketIO from "socket.io"
import { WebServer } from "../web-server/web-server";
import { BaseClass } from "../model/base-class";

export class SocketServer extends BaseClass{
    private serve?: http.Server;
    private socketServe?: socketIO.Server;

    constructor(private webServer: WebServer) {
        super();
    }

    private createServe() {
        this.serve = http.createServer(this.webServer.serve);
        this.socketServe = socketIO(this.serve);

        this.socketServe.on("connection", newSocket => {

            if (!newSocket.handshake.query.session || !newSocket.handshake.query.user)
                newSocket.disconnect();

            this.log.info(`New Socket connection -> ${newSocket.id}`)
            this.log.info(`User -> ${newSocket.handshake.query.user}`)
        })
    }

    private listenServe() {
        this.serve?.listen(process.env.port)
        this.log.info(`Server running -> http://localhost:${process.env.port}`)
    }

    initSocketServer() {
        this.createServe();
        this.listenServe();
    }
}