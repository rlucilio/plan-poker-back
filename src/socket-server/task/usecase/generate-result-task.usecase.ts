import { RoomGateway } from '../../../gateway/room.gateway';
import { ErrorBase } from '../../../error/error-base';
import { ErrorTypes } from '../../../error/error-types';

export class GenerateResultTaskUsecase {
    private roomGateway = new RoomGateway();

    execute (roomName: string, taskId: string): number {
      const room = this.roomGateway.findRoomByName(roomName);
      const task = room.tasks.find(task => task.id === taskId);

      if (!task) { throw new ErrorBase('Task not found', ErrorTypes.Role, { roomName, taskId }); }

      let resultVotting = task?.votes.map(vote => vote.votting).reduce((prev, curr) => prev + curr, 0);
      resultVotting /= task.votes.length;

      task.resultVoting = resultVotting;
      this.roomGateway.updateTask(roomName, task);

      return resultVotting;
    }
}
