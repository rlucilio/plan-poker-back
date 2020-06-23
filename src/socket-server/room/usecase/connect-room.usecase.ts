import { Socket } from 'socket.io';
import { ErrorBase } from '../../../error/error-base';
import { ErrorTypes } from '../../../error/error-types';
import cacheManager from '../../../cache/cache-manager';
import { VerifyConnectionRoom } from './verify-connection-room.usecase';
import { IConnectRoomModel } from './model/connect-room.model';
import { IRoom } from '../../../model/interfaces/room';

export class ConnectRoomUsecase {
  private cache = cacheManager;

  execute (socket: Socket) {
    const model: IConnectRoomModel = {
      room: socket.handshake.query.room,
      user: socket.handshake.query.user
    };

    const room = this.cache.get<IRoom>(model.room);
    if (!room) { throw new ErrorBase('Room invalid', ErrorTypes.Params, { model, room }); }

    socket.join(room?.room.name);
    new VerifyConnectionRoom().execute(room, model);
  }
}
