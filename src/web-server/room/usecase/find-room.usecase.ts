import configManager from '../../../cache/cache-manager';
import { ErrorBase } from '../../../error/error-base';
import { ErrorTypes } from '../../../error/error-types';
import { IRoom } from '../../../model/interfaces/room';

export class FindRoomUsecase {
  execute (nameSession: string) {
    nameSession = nameSession.replace(/ /g, '_');

    const result: IRoom = configManager.get(nameSession);

    if (!result) {
      throw new ErrorBase('Session no exist', ErrorTypes.Role, result);
    }

    return result;
  }
}
