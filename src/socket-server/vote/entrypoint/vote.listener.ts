import socketServer from '../../socket-server';
import { BaseClass } from '../../../model/base-class';
import { EventsReceivedsSocket } from '../../events-receiveds';
import { VoteUsecase } from '../usecase/vote.usecase';
import { IVoteRequest } from './request/vote.request';
import { EventsEmmiterSocket } from '../../events-emmiter';
import { FlipVotesUsecase } from '../usecase/flip-votes.usecase';
import { IFlipRequest } from './request/flip.request';

export class VoteListener extends BaseClass {
  onVote () {
    socketServer.addEventListener().then(socket => {
      socket.on(EventsReceivedsSocket.voteTask, (voteRequest: IVoteRequest) => {
        this.log.info(`Vote in task -> ${socket.id}`);
        this.log.info(`Room -> ${socket.handshake.query.room}`);

        try {
          new VoteUsecase().execute(voteRequest).subscribe(result =>
            socket.to(voteRequest.roomName).emit(result.event, result.user));
        } catch (error) {
          socket.emit(EventsEmmiterSocket.error, error);
        }
      });
    });
  }

  onFlip () {
    socketServer.addEventListener().then(socket => {
      socket.on(EventsReceivedsSocket.flipVotes, (flipRequest: IFlipRequest) => {
        this.log.info(`Flip in votes -> ${socket.id}`);
        this.log.info(`Room -> ${socket.handshake.query.room}`);

        try {
          new FlipVotesUsecase().execute({
            nameRoom: flipRequest.roomName,
            taskId: flipRequest.taskId
          });
        } catch (error) {
          socket.emit(EventsEmmiterSocket.error, error);
        }
      });
    });
  }
}
