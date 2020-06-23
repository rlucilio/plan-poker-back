import { Socket } from 'socket.io';
import { ConnectRoomUsecase } from './room/usecase/connect-room.usecase';
import { BaseClass } from '../model/base-class';

export class EventsEntrypoint extends BaseClass {
  registerEvents (socket: Socket) {
    this.log.info(`Register events -> ${socket.id}`);
    this.eventsRoom(socket);
  }

  private eventsRoom (socket: Socket) {
    this.log.info(`Register events of room -> ${socket.id}`);
    new ConnectRoomUsecase().execute(socket);
  }
}
