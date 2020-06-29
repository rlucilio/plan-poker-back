import { Log } from '../../../log/log';
import { Socket } from 'socket.io';
import socketServer from '../../socket-server';
import { ConnectRoomUsecase } from '../usecase/connect-room.usecase';

export class ConnectListner {
  onConnection () {
    socketServer.addEventListener().then(socket => {
      Log.info(`New Socket connection -> ${socket.id}`);
      Log.info(`User -> ${socket.handshake.query.user}`);

      try {
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
      } catch (error) {
        socket.disconnect();
        Log.error('Error in socket');
        Log.error(JSON.stringify(error));
      }
    });
  }
}
