import { TypesRoom } from './types-room';
import { ITaskRoom } from './task-room.model';

export interface ICreateSessionModel {
    owner: string;
    name: string;
    tasks: ITaskRoom[];
    settingsRoom: {
        timeoutFlipCards: number;
        enableFlipCardsTimeout: boolean;
        enableObserver: boolean;
        typeRoom: TypesRoom;
        description: string;
        flipCardsAfterReveal: boolean;
        keepHistory: boolean;
        autoFlipCards: boolean;
    }
}
