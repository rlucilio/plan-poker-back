import { IFlipTimeoutModel } from './model/flip-timeout.model';
import { Observable, ReplaySubject } from 'rxjs';
import { RoomGateway } from '../../../gateway/room.gateway';
import { IFlipTimeoutResult } from './model/flip-timeout.result';
import { ErrorBase } from '../../../error/error-base';
import { ErrorTypes } from '../../../error/error-types';
import { GenerateResultTaskUsecase } from './generate-result-task.usecase';

export class FlipTimeoutUsecase {
    private subjectFlipTimeout = new ReplaySubject<IFlipTimeoutResult>(1);
    private roomGateway = new RoomGateway();
    private generateResultTaskUsecase = new GenerateResultTaskUsecase();

    execute (flipTimeoutModel: IFlipTimeoutModel): Observable<IFlipTimeoutResult> {
      const room = this.roomGateway.findRoomByName(flipTimeoutModel.roomName);
      const task = room.tasks.find(task => task.id === flipTimeoutModel.taskId);

      if (!task) { throw new ErrorBase('Task not found', ErrorTypes.Role, flipTimeoutModel); }

      if (room.settingsRoom?.enableFlipCardsTimeout) {
        setTimeout(() => {
          const resultVotting = this.generateResultTaskUsecase.execute(flipTimeoutModel.roomName, flipTimeoutModel.taskId);

          this.subjectFlipTimeout.next({
            resultVotting: resultVotting,
            taskId: task.id
          });

          this.subjectFlipTimeout.complete();
        }, room.settingsRoom?.timeoutFlipCards || 0);
      } else {
        this.subjectFlipTimeout.complete();
      }

      return this.subjectFlipTimeout;
    }
}
