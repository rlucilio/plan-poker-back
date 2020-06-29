import { Router } from 'express';
import { GetListTasksUsecase } from '../usecase/get-list-tasks.usecase';
import { Log } from '../../../log/log';

export class TaskController {
  routerManager = Router();
  private getListTasksUsecase = new GetListTasksUsecase();

  get route () {
    this.getHistoryTasks();
    return this.routerManager;
  }

  private getHistoryTasks () {
    this.routerManager.get('/:room', (req, res) => {
      Log.info(`Request param -> ${JSON.stringify(req.params)}`);
      const result = this.getListTasksUsecase.execute(req.params.room);
      Log.info(`Response -> ${JSON.stringify(result)}`);
      return result;
    });
  }
}
