import { BaseClass } from '../../../model/base-class';
import { ObserverStorageGateway } from '../gateway/observer-storage.gateway';
import { IConnectRoomResult } from './model/connect-room-result.model';
import { EventsEmmiterSocket } from '../../events-emmiter';

export class ConnectRoomObserver extends BaseClass {
  private observerGateway = new ObserverStorageGateway();
  execute (roomName: string, socketId: string): IConnectRoomResult {
    this.log.info('Execute');
    this.observerGateway.saveObserser(roomName, {
      idSocket: socketId
    });

    return {
      event: EventsEmmiterSocket.newObserver,
      msg: 'Novo observador',
      user: 'observador'
    };
  }
}
