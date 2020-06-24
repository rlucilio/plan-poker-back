import { TypesRoom } from '../enums/types-room';

export interface IRoomSettings {
    timeoutFlipCards: number;
    enableFlipCardsTimeout: boolean;
    enableObserver: boolean;
    typeRoom: TypesRoom;
    changeVoteAfterReveal: boolean;
    keepHistory: boolean;
    autoFlipCards: boolean;
}
