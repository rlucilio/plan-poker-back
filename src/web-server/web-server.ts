import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { BaseClass } from '../model/base-class';
import { RoomController } from './room/entrypoint/room.controller';

class WebServer extends BaseClass {
  private _serve: Express = express();
  private roomController = new RoomController();

  private createMiddlewares () {
    this.log.info('Init middlewares');
    this.serve.use(morgan('dev'));
    this.serve.use(bodyParser.urlencoded({ extended: false }));
    this.serve.use(bodyParser.json());
    this.serve.use(cors());
  }

  private createRoutes () {
    this.log.info('Init routes');
    this.serve.use('/room', this.roomController.route);
  }

  get serve (): Express {
    return this._serve;
  }

  initWebServer () {
    this.createMiddlewares();
    this.createRoutes();
  }
}

export default new WebServer();
