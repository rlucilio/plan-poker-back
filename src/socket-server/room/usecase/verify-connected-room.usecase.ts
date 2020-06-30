import { RoomGateway } from '../../../gateway/room.gateway';
import { IUser } from '../../../model/interfaces/user';
import { IUserResultModel } from './model/user-result.model';

export class VerifyIfConnectedRoomUsecase {
    roomGateway = new RoomGateway();

    execute (roomName: string, socketId: string): null | IUserResultModel {
      const room = this.roomGateway.findRoomByName(roomName);
      if (!room) { return null; }

      const userExist = room.users.find(user => user.idSocket !== socketId);
      if (!userExist) { return null; }

      const newArrayUsers = room.users.filter(user => user.idSocket !== socketId);
      room.users = newArrayUsers;
      this.roomGateway.saveRoomBy(room);

      return {
        name: userExist.name,
        socketId: userExist.idSocket
      };
    }
}
