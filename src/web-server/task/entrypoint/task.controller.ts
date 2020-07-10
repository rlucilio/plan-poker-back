import { Router } from 'express';
import { GetListHistoryTasksUsecase } from '../usecase/get-list-history-tasks.usecase';
import { Log } from '../../../log/log';
import { stringify } from 'flatted';
import { RoutersWebServer } from '../../routers';
import { GetLastTaskUsecase } from '../usecase/get-last-task.usecase';
import { GetListTasksUsecase } from '../usecase/get-list-tasks.usecase';

export class TaskController {
  routerManager = Router();
  private getListHistoryTasksUsecase = new GetListHistoryTasksUsecase();
  private getLastTaskUsecase = new GetLastTaskUsecase();
  private getListTasksUsecase = new GetListTasksUsecase();

  get route () {
    this.getHistoryTasks();
    this.getLastTask();
    this.getAllTasks();
    return this.routerManager;
  }

  private getHistoryTasks () {
    this.routerManager.get(RoutersWebServer.task.history, (req, res) => {
      try {
        Log.info(`Request param -> ${stringify(req.params)}`);
        const result = this.getListHistoryTasksUsecase.execute(req.params.room);
        Log.info(`Response -> ${stringify(result)}`);
        res.status(200).json(result);
      } catch (error) {
        Log.error(`Erro in request -> ${stringify(error)}`);
        res.status(400).json(error);
      }
    });
  }

  private getLastTask () {
    this.routerManager.get(RoutersWebServer.task.getLast, (req, res) => {
      try {
        Log.info(`Request param -> ${stringify(req.params)}`);
        const result = this.getLastTaskUsecase.execute(req.params.room);
        Log.info(`Response -> ${stringify(result)}`);
        res.status(200).json(result);
      } catch (error) {
        Log.error(`Erro in request -> ${stringify(error)}`);
        res.status(400).json(error);
      }
    });
  }

  private getAllTasks () {
    this.routerManager.get(RoutersWebServer.task.getAll, (req, res) => {
      try {
        Log.info(`Request param -> ${stringify(req.params)}`);
        const result = this.getListTasksUsecase.execute(req.params.room);
        Log.info(`Response -> ${stringify(result)}`);
        res.status(200).json(result);
      } catch (error) {
        Log.error(`Erro in request -> ${stringify(error)}`);
        res.status(400).json(error);
      }
    });
  }
}
