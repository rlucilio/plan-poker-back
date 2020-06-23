import { ErrorBase } from '../../../error/error-base';
import { ErrorTypes } from '../../../error/error-types';
import cacheManager from '../../../cache/cache-manager';
import { IRoom } from '../../../model/interfaces/room';
import { CreateRoomModel } from './model/create-session.model';
import { TypesRoom } from '../../../model/enums/types-room';

export class CreateRoomUsecase {
  private myCache = cacheManager;

  execute (createSessionModel: CreateRoomModel.room) {
    if (!createSessionModel || !createSessionModel.name || !createSessionModel.owner) { throw new ErrorBase('Request body invalid', ErrorTypes.Params, createSessionModel); }

    if (this.myCache.get(createSessionModel.name)) { throw new ErrorBase('There is already a room with that name', ErrorTypes.Role, createSessionModel); }

    const newRoom: IRoom = {
      name: createSessionModel.name,
      users: [
        {
          name: createSessionModel.owner,
          owner: true
        }
      ]
    };
    this.setSettingsRoom(newRoom, createSessionModel.settingsRoom);
    this.myCache.set(createSessionModel.name, newRoom);
    return createSessionModel;
  }

  private setSettingsRoom (room: IRoom, settings?: CreateRoomModel.Settings) {
    if (!settings) {
      room.settingsRoom = {
        autoFlipCards: false,
        description: room.name,
        enableFlipCardsTimeout: false,
        enableObserver: true,
        changeVoteAfterReveal: false,
        keepHistory: false,
        timeoutFlipCards: -1,
        typeRoom: TypesRoom.hours
      };

      return;
    };

    room.settingsRoom = {
      autoFlipCards: settings.autoFlipCards,
      description: settings.description,
      enableFlipCardsTimeout: settings.enableFlipCardsTimeout,
      enableObserver: settings.enableObserver,
      changeVoteAfterReveal: settings.changeVoteAfterReveal,
      keepHistory: settings.keepHistory,
      timeoutFlipCards: settings.timeoutFlipCards,
      typeRoom: settings.typeRoom
    };
  }
}
