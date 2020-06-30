import { Log } from '../../../log/log';
import socketServer from '../../socket-server';
import { ConnectRoomUsecase } from '../usecase/connect-room.usecase';

export class ConnectHandler {
  onConnection () {
    socketServer.getHandler().subscribe(socket => {
      Log.info(`New Socket connection -> ${socket.id}`);
      Log.info(`User -> ${socket.handshake.query.user}`);

      try {
        const connectRoomResult = new ConnectRoomUsecase().execute({
          room: socket.handshake.query.room,
          user: socket.handshake.query.user
        }, socket.id);

        socket.join(socket.handshake.query.room);

        socket
          .to(socket.handshake.query.room)
          .emit(connectRoomResult.event, {
            msg: connectRoomResult.msg,
            user: connectRoomResult.user,
            socketId: socket.id
          });
      } catch (error) {
        socket?.disconnect();
        Log.error('Error in socket');
        Log.error(JSON.stringify(error));
      }
    });
  }
}
