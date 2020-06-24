import { IVote } from './votes';

export interface IUser {
    idSocket: string;
    name: string;
    owner: boolean;
    votes?: IVote[];
}
