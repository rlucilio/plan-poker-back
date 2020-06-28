import { ErrorBase } from '../../../error/error-base';
import { ErrorTypes } from '../../../error/error-types';
import { IRoom } from '../../../model/interfaces/room';
import { RoomGateway } from '../../../gateway/room.gateway';

export class FindRoomUsecase {
  roomGateway = new RoomGateway();
  execute (nameSession: string) {
    nameSession = nameSession.replace(/ /g, '_');

    const result: IRoom = this.roomGateway.findRoomByName(nameSession);

    if (!result) {
      throw new ErrorBase('Session no exist', ErrorTypes.Role, result);
    }

    return result;
  }
}
