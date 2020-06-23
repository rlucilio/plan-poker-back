import { IVote } from './votes';

export interface IUser {
    name: string;
    owner: boolean;
    votes?: IVote[];
}
