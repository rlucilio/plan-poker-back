import dotenv from 'dotenv';
import { BaseClass } from './model/base-class';
import webServer from './web-server/web-server';
import socketServer from './socket-server/socket-server';

class App extends BaseClass {
  main () {
    this.log.info('Init');
    dotenv.config();

    webServer.initWebServer();
    socketServer.initSocketServer();
  }
}

new App().main();
