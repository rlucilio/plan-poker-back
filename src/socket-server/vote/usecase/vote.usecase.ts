import { IVoteModel } from './model/vote.model';
import { RoomGateway } from '../../../gateway/room.gateway';
import { ErrorBase } from '../../../error/error-base';
import { ErrorTypes } from '../../../error/error-types';
import { IVoteResult } from './model/vote.result';
import { Observable, ReplaySubject } from 'rxjs';
import { EventsEmmiterSocket } from '../../events-emmiter';
import { ITaskRoom } from '../../../model/interfaces/task-room';
import { IUser } from '../../../model/interfaces/user';
import { IRoom } from '../../../model/interfaces/room';

export class VoteUsecase {
  private roomGateway = new RoomGateway();
  private resultObservable = new ReplaySubject<IVoteResult>(3);

  execute (voteModel: IVoteModel): Observable<IVoteResult> {
    const room = this.roomGateway.findRoomByName(voteModel.roomName);
    const task = room.tasks[room.tasks.length];
    const userVoting = room.users.find(userFind => userFind.idSocket === voteModel.socketId);

    if (!room || !task || !userVoting) {
      throw new ErrorBase('Params vote invalid', ErrorTypes.Params, voteModel);
    }

    const voteExist = task.votes.find(vote =>
      (vote.user.idSocket === voteModel.socketId && vote.task.id === voteModel.taskId));

    if (voteExist) {
      if (room.settingsRoom?.changeVoteAfterReveal) { this.vote(room, task, voteModel.value, userVoting); }
    } else {
      this.vote(room, task, voteModel.value, userVoting);
    }

    return this.resultObservable;
  }

  private vote (room: IRoom, task: ITaskRoom, votting: number, user: IUser) {
    const newVote = {
      user: user,
      votting,
      task
    };
    task.votes.push(newVote);
    user.votes?.push(newVote);

    this.resultObservable.next({
      event: EventsEmmiterSocket.newVote,
      user: {
        name: user.name,
        socketId: user.idSocket
      }
    });
    this.roomGateway.saveRoomBy(room);
    this.resultObservable.complete();
  }
}
