import cacheManager from '../../../cache/cache-manager';
import { IRoom } from '../../../model/interfaces/room';
import { IUser } from '../../../model/interfaces/user';

export class UserStorageGateway {
  findUserInRoomByName (roomName: string, nameUser: string) {
    return cacheManager.get<IRoom>(roomName).users.find(user => user.name === nameUser);
  }

  saveUserInRoom (roomName: string, user: IUser) {
    const room = cacheManager.get<IRoom>(roomName);

    room.users.push(user);
    cacheManager.set(roomName, room);
  }

  updateUserInRoom (roomName: string, userUpdate: IUser, nameUser: string) {
    const room = cacheManager.get<IRoom>(roomName);
    let userExist = cacheManager.get<IRoom>(roomName).users.find(user => user.name === nameUser);
    userExist = userUpdate;
    cacheManager.set(roomName, room);
  }
}
