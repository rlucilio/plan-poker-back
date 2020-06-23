import { Socket } from 'socket.io';
import { ErrorBase } from '../../../error/error-base';
import { ErrorTypes } from '../../../error/error-types';
import cacheManager from '../../../cache/cache-manager';
import { IConnectRoomModel } from './model/connect-room.model';
import { IRoom } from '../../../model/interfaces/room';
import { BaseClass } from '../../../model/base-class';
import socketServer from '../../socket-server';
import { EventsSocket } from '../../events-socket';

export class ConnectRoomUsecase extends BaseClass {
  private cache = cacheManager;

  execute (socket: Socket) {
    this.log.info('Execute');
    const model: IConnectRoomModel = {
      room: socket.handshake.query.room,
      user: socket.handshake.query.user
    };

    const room = this.cache.get<IRoom>(model.room);
    if (!room) { throw new ErrorBase('Room invalid', ErrorTypes.Params, { model, room }); }

    socket.join(room?.room.name);
    this.verifyConnectionRoom(room, model);
  }

  private verifyConnectionRoom (room: IRoom, model: IConnectRoomModel) {
    if (room.users.find(user => user.name === model.user)) {
      this.log.info(`Send event ${EventsSocket.joinRoom}`);

      socketServer.socket?.in(room.name)
        .emit(EventsSocket.joinRoom, {
          msg: 'Entrou na sala',
          user: model.user
        });
    } else {
      this.log.info(`Send event ${EventsSocket.returnRoom}`);

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
