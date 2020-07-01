import socketServer from '../../socket-server';
import { EventsReceivedsSocket } from '../../events-receiveds';
import { ICreateNewTaskModel } from '../usecase/model/create-new-task.model';
import { CreateNewTaskUsecase } from '../usecase/create-new-task.usecase';
import { ICreateNewTaskResult } from '../usecase/model/create-new-task.result';
import { IGetAllVotesInTaskRequest } from './requests/get-all-votes-in-task.request';
import { GetAllVotesInTaskUsecase } from '../usecase/get-all-votes-in-task.usecase';
import { EventsEmmiterSocket } from '../../events-emmiter';
import { Log } from '../../../log/log';

export class TaskHandler {
  onCreateNewTask () {
    socketServer.getHandler().subscribe(socket => {
      socket.on(EventsReceivedsSocket.requestNewCreateTask, (createNewTaskModel: ICreateNewTaskModel) => {
        Log.info(`New task -> ${socket.id}`);
        Log.info(`Room -> ${createNewTaskModel.roomName}`);

        new CreateNewTaskUsecase().execute(createNewTaskModel).subscribe((result: ICreateNewTaskResult) => {
          socket.in(createNewTaskModel.roomName).emit(result?.event, result.task);
          socket.emit(result.event, result.task);
        },
        error => socket.emit(EventsEmmiterSocket.error, {
          error,
          event: EventsReceivedsSocket.requestNewCreateTask,
          params: createNewTaskModel
        }));
      });
    });
  }

  onGetAllVotes () {
    socketServer.getHandler().subscribe(socket => {
      socket.on(EventsReceivedsSocket.getAllVotesInTask, (getAllVotesInTask: IGetAllVotesInTaskRequest) => {
        Log.info(`Get all votes in task-> ${socket.id}`);
        Log.info(`Room -> ${getAllVotesInTask.roomName}`);

        try {
          const result = new GetAllVotesInTaskUsecase().execute(getAllVotesInTask);
          socket.in(getAllVotesInTask.roomName)
            .emit(EventsEmmiterSocket.allVotes, result);
          socket.emit(EventsEmmiterSocket.allVotes, result);
        } catch (error) {
          socket.emit(EventsEmmiterSocket.error, {
            error,
            event: EventsReceivedsSocket.getAllVotesInTask,
            params: getAllVotesInTask
          });
        }
      });
    });
  }
}
