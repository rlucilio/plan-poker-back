import socketServer from '../../socket-server';
import { EventsReceivedsSocket } from '../../events-receiveds';
import { BaseClass } from '../../../model/base-class';
import { ICreateNewTaskModel } from '../usecase/model/create-new-task.model';
import { CreateNewTaskUsecase } from '../usecase/create-new-task.usecase';
import { ICreateNewTaskResult } from '../usecase/model/create-new-task.result';

export class TaskListener extends BaseClass {
  onCreateNewTask () {
    socketServer.addEventListener().then(socket => {
      socket.on(EventsReceivedsSocket.requestNewCreateTask, (createNewTaskModel: ICreateNewTaskModel) => {
        this.log.info(`New task -> ${socket.id}`);
        this.log.info(`Room -> ${socket.handshake.query.room}`);

        new CreateNewTaskUsecase().execute(createNewTaskModel).subscribe((result: ICreateNewTaskResult) => {
          socket.to(socket.handshake.query.room).emit(result?.event, {
            title: result.task
          });
        });
      });
    });
  }
}
