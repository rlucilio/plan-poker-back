import { RoomGateway } from '../../../gateway/room.gateway';

export class VerifyIfAllUserVotesUsecase {
  private roomGatey = new RoomGateway();
  execute (roomName: string, taskId: string): boolean {
    const room = this.roomGatey.findRoomByName(roomName);

    if (room.settingsRoom?.autoFlipCards) {
      return room.users.every(user => user.votes);
    }

    return false;
  }
}
