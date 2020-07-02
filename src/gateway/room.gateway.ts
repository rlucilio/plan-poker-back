import cacheManager from '../cache/cache-manager';
import { IRoom } from '../model/interfaces/room';
import { IObserver } from '../model/interfaces/observer';
import { IUser } from '../model/interfaces/user';
import { ITaskRoom } from '../model/interfaces/task-room';

export class RoomGateway {
  findRoomByName (nameRoom: string): IRoom {
    return cacheManager.get<IRoom>(nameRoom);
  }

  saveRoomBy (room: IRoom) {
    cacheManager.set(room.name, room);
  }

  addObserserInRoom (roomName: string, observer: IObserver) {
    const room = this.findRoomByName(roomName);

    room.observers.push(observer);
    this.saveRoomBy(room);
  }

  findUserInRoomByName (roomName: string, nameUser: string) {
    return this.findRoomByName(roomName).users.find(user => user.name === nameUser);
  }

  addUserInRoom (roomName: string, user: IUser) {
    const room = this.findRoomByName(roomName);

    room.users.push(user);
    this.saveRoomBy(room);
  }

  updateUserInRoom (roomName: string, userUpdate: IUser, nameUser: string) {
    const room = this.findRoomByName(roomName);
    let userExist = room.users.find(user => user.name === nameUser);
    userExist = Object.assign(userExist, userUpdate);
    this.saveRoomBy(room);
  }

  AddTask (newTask: ITaskRoom, nameRoom: string) {
    const room = this.findRoomByName(nameRoom);

    newTask.room = room;

    room.tasks?.push(newTask);
    this.saveRoomBy(room);
  }

  getAllTasks (nameRoom: string): ITaskRoom[] {
    const room = this.findRoomByName(nameRoom);

    return room.tasks || [];
  }

  updateTask (nameRoom: string, newTask: ITaskRoom) {
    const room = this.findRoomByName(nameRoom);

    const oldTask = room.tasks.find(task => task.id === newTask.id);

    if (oldTask) { oldTask.resultVoting = newTask.resultVoting; }

    this.saveRoomBy(room);
  }

  findTaskById (nameRoom: string, taskId: string): ITaskRoom | undefined {
    const room = this.findRoomByName(nameRoom);

    return room.tasks.find(task => task.id === taskId);
  }
}
