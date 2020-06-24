import { ITaskRoom } from '../../../model/interfaces/task-room';
import cacheManager from '../../../cache/cache-manager';
import { IRoom } from '../../../model/interfaces/room';

export class TaskGateway {
  saveTask (newTask: ITaskRoom, nameRoom: string) {
    const room = cacheManager.get<IRoom>(nameRoom);

    newTask.room = room;

    room.tasks?.push(newTask);
    cacheManager.set(nameRoom, room);
  }
}
