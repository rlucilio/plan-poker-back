import { ITaskRoom } from './task-room';
import { IUser } from './user';
import { IRoomSettings } from './room-settings';

export interface IRoom {
    name: string;
    tasks?: ITaskRoom[];
    users: IUser[];
    settingsRoom?: IRoomSettings;
}
