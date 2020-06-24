import { TypesRoom } from '../../../../model/enums/types-room';

export namespace CreateRoomModel {
    export interface room {
        owner: string;
        name: string;
        tasks: Task[]
        settingsRoom: Settings;
        description: string;
    }

    export interface Task {
        title: string;
        description: string;
        resultVoting: number;
    }

    export interface Settings {
        timeoutFlipCards: number;
        enableFlipCardsTimeout: boolean;
        enableObserver: boolean;
        typeRoom: TypesRoom;
        changeVoteAfterReveal: boolean;
        keepHistory: boolean;
        autoFlipCards: boolean;
    }
}
