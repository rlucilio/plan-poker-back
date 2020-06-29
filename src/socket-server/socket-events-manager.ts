import { ConnectListner } from './room/entrypoint/connect.listener';
import { Log } from '../log/log';

export class SocketEventsManager {
  connectListner?: ConnectListner;

  registerEventsListeners () {
    Log.info('Register Events Listeners');
    this.connectListner = new ConnectListner();
  }
}
