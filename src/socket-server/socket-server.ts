import http from 'http';
import socketIO from 'socket.io';
import { BaseClass } from '../model/base-class';
import webServer from '../web-server/web-server';
import { EventsEntrypoint } from './events.entrypoint';

class SocketServer extends BaseClass {
  private serve?: http.Server;
  private eventsEntrypoint = new EventsEntrypoint();
  socket?: socketIO.Server;

  private createServe () {
    this.serve = http.createServer(webServer.serve);
    this.socket = socketIO(this.serve);

    this.socket.on('connection', newSocket => {
      if (!newSocket.handshake.query.room || !newSocket.handshake.query.user) { newSocket.disconnect(); }

      this.log.info(`New Socket connection -> ${newSocket.id}`);
      this.log.info(`User -> ${newSocket.handshake.query.user}`);

      this.addEventsSockets(newSocket);
    });
  }

  private listenServe () {
    this.serve?.listen(process.env.port);
    this.log.info(`Server running -> ${process.env.host}:${process.env.port}`);
  }

  private addEventsSockets (newSocket: socketIO.Socket) {
    try {
      this.eventsEntrypoint.registerEvents(newSocket);
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
