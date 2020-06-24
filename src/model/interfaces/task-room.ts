import { IVote } from './votes';
import { IRoom } from './room';

export interface ITaskRoom {
    title: string;
    description: string;
    resultVoting?: number;
    votes: IVote[];
    room?: IRoom;
}
