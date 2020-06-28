import http from 'http';
import socketIO from 'socket.io';
import { BaseClass } from '../model/base-class';
import webServer from '../web-server/web-server';
import { SocketEventsManager } from './socket-events-manager';

class SocketServer extends BaseClass {
  private serve?: http.Server;
  private socketEventsManager = new SocketEventsManager();
  socket?: socketIO.Server;

  private createServe () {
    this.serve = http.createServer(webServer.serve);
    this.socket = socketIO(this.serve);
  }

  private listenServe () {
    this.serve?.listen(process.env.port);
    this.log.info(`Server running -> ${process.env.host}:${process.env.port}`);
  }

  initSocketServer () {
    this.createServe();
    this.listenServe();
    this.socketEventsManager.registerEventsListeners();
  }

  addEventListener (): Promise<socketIO.Socket> {
    return new Promise((resolve, reject) => {
      this.socket?.on('connection', socket => {
        try {
          resolve(socket);
        } catch (error) {
          socket.disconnect();
          this.log.error('Error in socket');
          this.log.error(JSON.stringify(error));
          reject(error);
        }
      });
    });
  }
}

export default new SocketServer();
