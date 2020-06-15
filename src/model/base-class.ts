interface ILog {
    info(msg: string);
    warn(msg: string);
    error(msg: string);
    printObj();
}

export class BaseClass {
    constructor() { }
    protected log: ILog = {
        info: (msg: string) => {
            console.log(`[${new Date().toISOString()} - ${(this as Object).constructor.name}] -> ${msg}`);
        },
        warn: (msg: string) => {
            console.warn(`[${new Date().toISOString()} - ${(this as Object).constructor.name}] -> ${msg}`);
        },
        error: (msg: string) => {
            console.error(`[${new Date().toISOString()} - ${(this as Object).constructor.name}] -> ${msg}`);
        },
        printObj: () => {
            console.log(`[${new Date().toISOString()} - ${(this as Object).constructor.name}] -> `);
            console.dir(this);
        }
    };
    
}