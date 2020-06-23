import http from 'http';
import socketIO from 'socket.io';
import { BaseClass } from '../model/base-class';
import { ConnectSessionUsecase } from './session/usecase/connect-session.usecase';
import webServer from '../web-server/web-server';

class SocketServer extends BaseClass {
    private serve?: http.Server;
    socket?: socketIO.Server;

    private createServe () {
      this.serve = http.createServer(webServer.serve);
      this.socket = socketIO(this.serve);

      this.socket.on('connection', newSocket => {
        if (!newSocket.handshake.query.session || !newSocket.handshake.query.user) { newSocket.disconnect(); }

        this.log.info(`New Socket connection -> ${newSocket.id}`);
        this.log.info(`User -> ${newSocket.handshake.query.user}`);

        this.addEventsSockets(newSocket);
      });
    }

    private listenServe () {
        this.serve?.listen(process.env.port);
        this.log.info(`Server running -> http://localhost:${process.env.port}`);
    }

    private addEventsSockets (newSocket: socketIO.Socket) {
      try {
        new ConnectSessionUsecase().execute(newSocket);
      } catch (error) {
        newSocket.disconnect();
        this.log.error(`Error in add event -> ${JSON.stringify(error)}`);
      }
    }

    initSocketServer () {
      this.createServe();
      this.listenServe();
    }
}

export default new SocketServer();
