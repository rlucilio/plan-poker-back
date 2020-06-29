import { Router } from 'express';
import { CreateRoomUsecase } from '../usecase/create-room.usecase';
import { FindRoomUsecase } from '../usecase/find-room.usecase';
import { Log } from '../../../log/log';
import { RoutersWebServer } from '../../routers';

export class RoomController {
  private createRoomUsecase = new CreateRoomUsecase();
  private findRoomUsecase = new FindRoomUsecase();
  private routerManager = Router();

  get route () {
    this.createRoom();
    this.verifyExistRoom();
    return this.routerManager;
  }

  private createRoom () {
    this.routerManager.post('/', (req, res) => {
      Log.info(`Request body -> ${JSON.stringify(req.body)}`);

      try {
        const response = this.createRoomUsecase.execute(req.body);
        Log.info(`Response ${JSON.stringify(response)}`);
        res.status(200).json(response);
      } catch (error) {
        Log.error(`Erro in request -> ${JSON.stringify(error)}`);
        res.status(400).json(error);
      }
    });
  }

  private verifyExistRoom () {
    this.routerManager.get(RoutersWebServer.room.find, (request, response) => {
      Log.info(`Request body -> ${request.params.name}`);

      try {
        const res = this.findRoomUsecase.execute(request.params.name);
        Log.info(`Response ${JSON.stringify(res)}`);
        response.status(200).json(res);
      } catch (error) {
        Log.error(`Erro in request -> ${JSON.stringify(error)}`);
        response.status(400).json(error);
      }
    });
  }
}
