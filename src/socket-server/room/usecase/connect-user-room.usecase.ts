import { IConnectRoomModel } from './model/connect-room.model';
import { BaseClass } from '../../../model/base-class';
import { EventsEmmiterSocket } from '../../events-emmiter';
import { UserStorageGateway } from '../gateway/user-storage.gateway';
import { IUser } from '../../../model/interfaces/user';
import { IConnectRoomResult } from './model/connect-room-result.model';

export class ConnectUserRoomUsecase extends BaseClass {
    private userGateway = new UserStorageGateway();

    execute (model: IConnectRoomModel, socketId: string): IConnectRoomResult {
      this.log.info('Execute');
      const userExist = this.userGateway.findUserInRoomByName(model.room, model.user);

      if (userExist) {
        this.log.info(`Send event ${EventsEmmiterSocket.joinRoom}`);
        userExist.idSocket = socketId;
        this.userGateway.updateUserInRoom(model.room, userExist, model.user);

        return {
          event: EventsEmmiterSocket.joinRoom,
          msg: 'Entrou na sala',
          user: userExist.name
        };
      } else {
        this.log.info(`Send event ${EventsEmmiterSocket.returnRoom}`);

        const newUser: IUser = {
          idSocket: socketId,
          name: model.user,
          votes: [],
          owner: false
        };

        this.userGateway.saveUserInRoom(model.room, newUser);

        return {
          event: EventsEmmiterSocket.joinRoom,
          msg: 'Entrou na sala',
          user: model.user
        };
      }
    }
}
