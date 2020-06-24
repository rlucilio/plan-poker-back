import { IObserver } from '../../../model/interfaces/observer';
import cacheManager from '../../../cache/cache-manager';
import { IRoom } from '../../../model/interfaces/room';

export class ObserverStorageGateway {
  saveObserser (roomName: string, observer: IObserver) {
    const room = cacheManager.get<IRoom>(roomName);

    room.observers.push(observer);
    cacheManager.set(roomName, room);
  }
}
