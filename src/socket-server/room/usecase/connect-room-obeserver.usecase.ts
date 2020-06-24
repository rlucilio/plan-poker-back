import { BaseClass } from '../../../model/base-class';
import { IConnectRoomResult } from './model/connect-room-result.model';
import { EventsEmmiterSocket } from '../../events-emmiter';
import { RoomGateway } from '../../../gateway/room.gateway';

export class ConnectRoomObserver extends BaseClass {
  private roomGateway = new RoomGateway();
  execute (roomName: string, socketId: string): IConnectRoomResult {
    this.log.info('Execute');
    this.roomGateway.addObserserInRoom(roomName, {
      idSocket: socketId
    });

    return {
      event: EventsEmmiterSocket.newObserver,
      msg: 'Novo observador',
      user: 'observador'
    };
  }
}
