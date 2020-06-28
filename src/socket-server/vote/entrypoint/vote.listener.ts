import socketServer from '../../socket-server';
import { BaseClass } from '../../../model/base-class';
import { EventsReceivedsSocket } from '../../events-receiveds';

export class VoteListener extends BaseClass {
  onVote () {
    socketServer.addEventListener().then(socket => {
      socket.on(EventsReceivedsSocket.voteTask, () => {
        this.log.info(`Vote in task -> ${socket.id}`);
        this.log.info(`Room -> ${socket.handshake.query.room}`);
      });
    });
  }

  onFlip () {
    socketServer.addEventListener().then(socket => {
      socket.on(EventsReceivedsSocket.flipVotes, () => {
        this.log.info(`Flip in votes -> ${socket.id}`);
        this.log.info(`Room -> ${socket.handshake.query.room}`);
      });
    });
  }
}
