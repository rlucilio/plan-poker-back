import { Socket } from 'socket.io';
import { EventsSocket } from '../../events-socket';
import { ICreateNewTaskModel } from './model/create-new-task.model';
import cacheManager from '../../../cache/cache-manager';
import { IRoom } from '../../../model/interfaces/room';

export class CreateNewTaskUsecase {
  execute (socket: Socket) {
    socket.on(EventsSocket.requestNewCreateTask, (createNewTaskModel: ICreateNewTaskModel) => {
      const room: IRoom = cacheManager.get<IRoom>(createNewTaskModel.roomName);

      if (room.settingsRoom?.enableFlipCardsTimeout) {
        setTimeout(() => {
          socket.in(room.name).emit(EventsSocket.timeoutFlipCards);
        }, room.settingsRoom.timeoutFlipCards);
      }

      socket.emit(EventsSocket.newTask);
    });
  }
}
