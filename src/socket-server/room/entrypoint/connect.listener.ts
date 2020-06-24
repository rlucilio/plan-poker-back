import { BaseClass } from '../../../model/base-class';
import { Socket } from 'socket.io';
import socketServer from '../../socket-server';
import { ConnectRoomUsecase } from '../usecase/connect-room.usecase';

export class ConnectListner extends BaseClass {
  onConnection () {
    socketServer.addEventListener().then(socket => {
      this.log.info(`New Socket connection -> ${socket.id}`);
      this.log.info(`User -> ${socket.handshake.query.user}`);

      const connectRoomResult = new ConnectRoomUsecase().execute({
        room: socket.handshake.query.room,
        user: socket.handshake.query.user
      }, socket.id);

      socket.join(socket.handshake.query.room);

      socket
        .in(socket.handshake.query.room)
        .emit(connectRoomResult.event, {
          msg: connectRoomResult.msg,
          user: connectRoomResult.user
        });
    });
  }
}
