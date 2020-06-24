import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';
import { BaseClass } from '../model/base-class';
import { RouterManager } from './router-manager';

class WebServer extends BaseClass {
  private _serve: Express = express();
  private routers = new RouterManager();

  private createMiddlewares () {
    this.log.info('Init middlewares');
    this.serve.use(morgan('dev'));
    this.serve.use(urlencoded({ extended: false }));
    this.serve.use(json());
    this.serve.use(cors());
  }

  private createRoutes () {
    this.log.info('Init routes');
  }

  get serve (): Express {
    return this._serve;
  }

  initWebServer () {
    this.createMiddlewares();
    this.createRoutes();
    this.routers.registerRouters();
  }
}

export default new WebServer();
