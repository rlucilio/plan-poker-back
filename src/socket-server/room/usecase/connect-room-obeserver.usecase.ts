import { IConnectRoomResult } from './model/connect-room-result.model';
import { EventsEmmiterSocket } from '../../events-emmiter';
import { RoomGateway } from '../../../gateway/room.gateway';
import { Log } from '../../../log/log';

export class ConnectRoomObserver {
  private roomGateway = new RoomGateway();
  execute (roomName: string, socketId: string): IConnectRoomResult {
    Log.info('Execute');
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
