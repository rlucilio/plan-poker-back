import { EventsEmmiterSocket } from '../../events-emmiter';
import { ICreateNewTaskModel } from './model/create-new-task.model';
import cacheManager from '../../../cache/cache-manager';
import { IRoom } from '../../../model/interfaces/room';
import { BaseClass } from '../../../model/base-class';
import { ICreateNewTaskResult } from './model/create-new-task.result';
import { Observable, ReplaySubject } from 'rxjs';
import { TaskGateway } from '../gateway/task.gateway';
import { ITaskRoom } from '../../../model/interfaces/task-room';

export class CreateNewTaskUsecase extends BaseClass {
  private subjectCreateNewTask = new ReplaySubject<ICreateNewTaskResult>(1);
  private taskGateway = new TaskGateway();

  execute (createNewTaskModel: ICreateNewTaskModel) {
    this.log.info(`Execute -> ${createNewTaskModel.socketId}`);
    const room: IRoom = cacheManager.get<IRoom>(createNewTaskModel.roomName);

    const newTask: ITaskRoom = {
      description: '',
      title: '',
      votes: []
    };

    this.taskGateway.saveTask(newTask, createNewTaskModel.roomName);

    if (room.settingsRoom?.enableFlipCardsTimeout) {
      setTimeout(() => {
        this.log.info(`Execute flip timeout-> ${createNewTaskModel.socketId}`);
        this.subjectCreateNewTask.next({
          event: EventsEmmiterSocket.timeoutFlipCards,
          task: {
            title: createNewTaskModel.taskName,
            description: createNewTaskModel.description
          }
        });
        this.subjectCreateNewTask.complete();
      }, room.settingsRoom.timeoutFlipCards);

      this.subjectCreateNewTask.next({
        event: EventsEmmiterSocket.newTask,
        task: {
          title: createNewTaskModel.taskName,
          description: createNewTaskModel.description
        }
      });
    } else {
      this.subjectCreateNewTask.next({
        event: EventsEmmiterSocket.newTask,
        task: {
          title: createNewTaskModel.taskName,
          description: createNewTaskModel.description
        }
      });
      this.subjectCreateNewTask.complete();
    }

    return this.subjectCreateNewTask;
  }
}
