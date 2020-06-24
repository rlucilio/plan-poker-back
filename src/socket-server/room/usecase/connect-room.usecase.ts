import { ErrorBase } from '../../../error/error-base';
import { ErrorTypes } from '../../../error/error-types';
import cacheManager from '../../../cache/cache-manager';
import { IConnectRoomModel } from './model/connect-room.model';
import { IRoom } from '../../../model/interfaces/room';
import { BaseClass } from '../../../model/base-class';
import { ConnectUserRoomUsecase } from './connect-user-room.usecase';
import { ConnectRoomObserver } from './connect-room-obeserver.usecase';
import { IConnectRoomResult } from './model/connect-room-result.model';

export class ConnectRoomUsecase extends BaseClass {
  execute (connectRoomModel: IConnectRoomModel, userSocketId: string): IConnectRoomResult {
    this.log.info('Execute');

    this.verifyExistRoom(connectRoomModel);

    if (connectRoomModel.user) {
      return new ConnectUserRoomUsecase().execute(connectRoomModel, userSocketId);
    } else {
      return new ConnectRoomObserver().execute(connectRoomModel.room, userSocketId);
    }
  }

  private verifyExistRoom (model: IConnectRoomModel) {
    const room: IRoom = cacheManager.get<IRoom>(model.room);
    if (!room) { throw new ErrorBase('Room invalid', ErrorTypes.Params, { model, room }); }
  }
}
