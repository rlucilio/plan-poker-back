interface ILog {
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    printObj(): void;
}

export class BaseClass {
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
