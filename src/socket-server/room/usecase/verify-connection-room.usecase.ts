import { IConnectRoomModel } from './model/connect-room.model';
import socketServer from '../../socket-server';
import cacheManager from '../../../cache/cache-manager';
import { EventsSocket } from '../../events-socket';
import { IRoom } from '../../../model/interfaces/room';

export class VerifyConnectionRoom {
  execute (room: IRoom, model: IConnectRoomModel) {
    if (room.users.find(user => user.name === model.user)) {
      socketServer.socket?.in(room.name)
        .emit(EventsSocket.joinRoom, {
          msg: 'Entrou na sala',
          user: model.user
        });
    } else {
      socketServer.socket?.in(room.name)
        .emit(EventsSocket.returnRoom, {
          msg: 'Novo membro na sala',
          user: model.user
        });

      room.users.push({
        name: model.user,
        owner: false
      });

      cacheManager.set(room.name, room);
    }
  }
}
