import { Router } from 'express';
import { GetListTasksUsecase } from '../usecase/get-list-tasks.usecase';
import { Log } from '../../../log/log';
import { RoutersWebServer } from '../../routers';

export class TaskController {
  routerManager = Router();
  private getListTasksUsecase = new GetListTasksUsecase();

  get route () {
    this.getHistoryTasks();
    return this.routerManager;
  }

  private getHistoryTasks () {
    this.routerManager.get(RoutersWebServer.task.find, (req, res) => {
      try {
        Log.info(`Request param -> ${JSON.stringify(req.params)}`);
        const result = this.getListTasksUsecase.execute(req.params.room);
        Log.info(`Response -> ${JSON.stringify(result)}`);
        res.status(200).json(result);
      } catch (error) {
        Log.error(`Erro in request -> ${JSON.stringify(error)}`);
        res.status(400).json(error);
      }
    });
  }
}
