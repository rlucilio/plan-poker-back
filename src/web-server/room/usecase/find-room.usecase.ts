import { ErrorBase } from '../../../error/error-base';
import { ErrorTypes } from '../../../error/error-types';
import { IRoom } from '../../../model/interfaces/room';
import { RoomGateway } from '../../../gateway/room.gateway';
import { IFindRoomUsecase } from './model/find-room.usecase';

export class FindRoomUsecase {
  roomGateway = new RoomGateway();
  execute (nameSession: string): IFindRoomUsecase {
    nameSession = nameSession.replace(/ /g, '_');

    const room: IRoom = this.roomGateway.findRoomByName(nameSession);

    if (!room) {
      throw new ErrorBase('Session no exist', ErrorTypes.Role, nameSession);
    }

    const result: IFindRoomUsecase = {
      description: room.description,
      name: room.name,
      observers: room.observers.map(observe => ({ idSocket: observe.idSocket })),
      settingsRoom: {
        autoFlipCards: room.settingsRoom?.autoFlipCards || false,
        changeVoteAfterReveal: room.settingsRoom?.changeVoteAfterReveal || false,
        enableFlipCardsTimeout: room.settingsRoom?.enableFlipCardsTimeout || false,
        enableObserver: room.settingsRoom?.enableObserver || false,
        keepHistory: room.settingsRoom?.keepHistory || false,
        timeoutFlipCards: room.settingsRoom?.timeoutFlipCards || 0,
        typeRoom: room.settingsRoom?.typeRoom || ''
      },
      tasks: room.tasks.map(task => ({
        description: task.description,
        id: task.id,
        title: task.title,
        votes: task.votes.map(vote => ({
          votting: vote.votting,
          user: {
            idSocket: vote.user.idSocket,
            name: vote.user.name
          }
        })),
        resultVoting: task.resultVoting
      })),
      users: room.users.map(user => ({ idSocket: user.idSocket, name: user.name }))
    };

    return result;
  }
}
