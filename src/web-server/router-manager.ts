import webServer from './web-server';
import { RoomController } from './room/entrypoint/room.controller';
import { BaseClass } from '../model/base-class';
import { RoutersWebServer } from './routers';
import { TaskController } from './task/entrypoint/task.controller';

export class RouterManager extends BaseClass {
  registerRouters () {
    this.log.info('Register Routers');
    webServer.serve.use(RoutersWebServer.room, new RoomController().route);
    webServer.serve.use(RoutersWebServer.task, new TaskController().route);
  }
}
