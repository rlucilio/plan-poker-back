import dotenv from "dotenv";
import { WebServer } from "./web-server/web-server";
import { BaseClass } from "./model/base-class";
import { SocketServer } from "./socket-server/socket-server";

class App extends BaseClass{
    private webServer = new WebServer();
    private socketServer = new SocketServer(this.webServer);

    constructor(){
        super();
    }

    main() {
        this.log.info("Init");
        dotenv.config();


        this.webServer.initWebServer();
        this.socketServer.initSocketServer();
    }
}

new App().main();