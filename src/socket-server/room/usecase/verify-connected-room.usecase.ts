import { RoomGateway } from '../../../gateway/room.gateway';
import { IUserResultModel } from './model/user-result.model';

export class VerifyIfConnectedRoomUsecase {
    roomGateway = new RoomGateway();

    execute (roomName: string, socketId: string): null | IUserResultModel {
      const room = this.roomGateway.findRoomByName(roomName);
      if (!room) { return null; }

      const userExist = room.users.find(user => user.idSocket === socketId);

      const newArrayUsers = room.users.filter(user => user.idSocket !== socketId);
      const newArrayObserves = room.observers.filter(obs => obs.idSocket !== socketId);
      room.users = newArrayUsers;
      room.observers = newArrayObserves;
      this.roomGateway.saveRoomBy(room);

      return {
        name: userExist?.name,
        socketId: socketId
      };
    }
}
