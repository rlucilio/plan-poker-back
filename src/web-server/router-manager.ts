import webServer from './web-server';
import { RoomController } from './room/entrypoint/room.controller';
import { RoutersWebServer } from './routers';
import { TaskController } from './task/entrypoint/task.controller';
import { Log } from '../log/log';

export class RouterManager {
  registerRouters () {
    Log.info('Register Routers');
    webServer.serve.use(RoutersWebServer.room, new RoomController().route);
    webServer.serve.use(RoutersWebServer.task, new TaskController().route);
  }
}
