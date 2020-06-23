import { Socket } from 'socket.io';
import { ConnectRoomUsecase } from './room/usecase/connect-room.usecase';

export class EventsEntrypoint {
  registerEvents (socket: Socket) {
    new ConnectRoomUsecase().execute(socket);
  }
}
