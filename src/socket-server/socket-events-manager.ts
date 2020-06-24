import { BaseClass } from '../model/base-class';
import { ConnectListner } from './room/entrypoint/connect.listener';

export class SocketEventsManager extends BaseClass {
  connectListner?: ConnectListner;

  registerEventsListeners () {
    this.log.info('Register Events Listeners');
    this.connectListner = new ConnectListner();
  }
}
