import { ReplaySubject } from 'rxjs';
import { RoomGateway } from '../../../gateway/room.gateway';
import { BaseClass } from '../../../model/base-class';
import { IRoom } from '../../../model/interfaces/room';
import { ITaskRoom } from '../../../model/interfaces/task-room';
import { EventsEmmiterSocket } from '../../events-emmiter';
import { ICreateNewTaskModel } from './model/create-new-task.model';
import { ICreateNewTaskResult } from './model/create-new-task.result';
import { FlipTimeoutUsecase } from './flip-timeout.usecase';

export class CreateNewTaskUsecase extends BaseClass {
  private subjectCreateNewTask = new ReplaySubject<ICreateNewTaskResult>(1);
  private flipTimeoutUsecase = new FlipTimeoutUsecase();
  private roomGateway = new RoomGateway();

  execute (createNewTaskModel: ICreateNewTaskModel) {
    this.log.info(`Execute -> ${createNewTaskModel.socketId}`);
    const room: IRoom = this.roomGateway.findRoomByName(createNewTaskModel.roomName);

    const newTask: ITaskRoom = {
      id: room.tasks.length + createNewTaskModel.taskName,
      description: createNewTaskModel.description,
      title: createNewTaskModel.taskName,
      votes: []
    };

    this.roomGateway.AddTask(newTask, createNewTaskModel.roomName);

    if (room.settingsRoom?.enableFlipCardsTimeout) {
      this.flipTimeoutUsecase.execute({ roomName: createNewTaskModel.roomName, taskId: newTask.id }).subscribe(
        result => this.notifyEventTask(EventsEmmiterSocket.timeoutFlipCards, result.taskId, newTask.description, newTask.title, result.resultVotting),
        error => this.subjectCreateNewTask.error(error),
        () => this.subjectCreateNewTask.complete());
    } else {
      this.notifyEventTask(EventsEmmiterSocket.newTask, newTask.id, newTask.description, newTask.title);
    }

    return this.subjectCreateNewTask;
  }

  private notifyEventTask (event: string, taskId: string, description: string, taskName: string, valueVotting: number | undefined = undefined) {
    this.subjectCreateNewTask.next({
      event: event,
      task: {
        id: taskId,
        value: valueVotting,
        description: description,
        title: taskName
      }
    });
  }
}
