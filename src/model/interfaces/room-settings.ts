import { TypesRoom } from '../enums/types-room';

export interface IRoomSettings {
    timeoutFlipCards: number;
    enableFlipCardsTimeout: boolean;
    enableObserver: boolean;
    keepHistory: boolean;
    changeVoteAfterReveal: boolean;
    autoFlipCards: boolean;
    typeRoom: TypesRoom;
}
