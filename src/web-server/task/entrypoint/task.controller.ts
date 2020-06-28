import { Router } from 'express';
import { BaseClass } from '../../../model/base-class';
import { GetListTasksUsecase } from '../usecase/get-list-tasks.usecase';

export class TaskController extends BaseClass {
  routerManager = Router();
  private getListTasksUsecase = new GetListTasksUsecase();

  get route () {
    this.getHistoryTasks();
    return this.routerManager;
  }

  private getHistoryTasks () {
    this.routerManager.get('/:room', (req, res) => {
      this.log.info(`Request param -> ${JSON.stringify(req.params)}`);
      const result = this.getListTasksUsecase.execute(req.params.room);
      this.log.info(`Response -> ${JSON.stringify(result)}`);
      return result;
    });
  }
}
