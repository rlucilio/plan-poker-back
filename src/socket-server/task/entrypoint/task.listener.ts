import socketServer from '../../socket-server';
import { EventsReceivedsSocket } from '../../events-receiveds';
import { BaseClass } from '../../../model/base-class';
import { ICreateNewTaskModel } from '../usecase/model/create-new-task.model';
import { CreateNewTaskUsecase } from '../usecase/create-new-task.usecase';
import { ICreateNewTaskResult } from '../usecase/model/create-new-task.result';
import { IGetAllVotesInTaskRequest } from './requests/get-all-votes-in-task.request';
import { GetAllVotesInTaskUsecase } from '../usecase/get-all-votes-in-task.usecase';
import { EventsEmmiterSocket } from '../../events-emmiter';

export class TaskListener extends BaseClass {
  onCreateNewTask () {
    socketServer.addEventListener().then(socket => {
      socket.on(EventsReceivedsSocket.requestNewCreateTask, (createNewTaskModel: ICreateNewTaskModel) => {
        this.log.info(`New task -> ${socket.id}`);
        this.log.info(`Room -> ${createNewTaskModel.roomName}`);

        new CreateNewTaskUsecase().execute(createNewTaskModel).subscribe((result: ICreateNewTaskResult) => {
          socket.to(createNewTaskModel.roomName).emit(result?.event, {
            title: result.task
          });
        },
        error => socket.emit(EventsEmmiterSocket.error, error));
      });
    });
  }

  onGetAllVotes () {
    socketServer.addEventListener().then(socket => {
      socket.on(EventsReceivedsSocket.getAllVotesInTask, (getAllVotesInTask: IGetAllVotesInTaskRequest) => {
        this.log.info(`Get all votes in task-> ${socket.id}`);
        this.log.info(`Room -> ${getAllVotesInTask.roomName}`);

        try {
          socket.to(getAllVotesInTask.roomName)
            .emit(EventsEmmiterSocket.allVotes, new GetAllVotesInTaskUsecase().execute(getAllVotesInTask));
        } catch (error) {
          socket.emit(EventsEmmiterSocket.error, error);
        }
      });
    });
  }
}
