import { Router } from 'express';
import { CreateRoomUsecase } from '../usecase/create-room.usecase';
import { BaseClass } from '../../../model/base-class';
import { FindRoomUsecase } from '../usecase/find-room.usecase';

export class RoomController extends BaseClass {
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
      this.log.info(`Request body -> ${JSON.stringify(req.body)}`);

      try {
        const response = this.createRoomUsecase.execute(req.body);
        this.log.info(`Response ${JSON.stringify(response)}`);
        res.status(200).json(response);
      } catch (error) {
        this.log.error(`Erro in request -> ${JSON.stringify(error)}`);
        res.status(400).json(error);
      }
    });
  }

  private verifyExistRoom () {
    this.routerManager.get('/find/:name', (request, response) => {
      this.log.info(`Request body -> ${request.params.name}`);

      try {
        const res = this.findRoomUsecase.execute(request.params.name);
        this.log.info(`Response ${JSON.stringify(res)}`);
        response.status(200).json(res);
      } catch (error) {
        this.log.error(`Erro in request -> ${JSON.stringify(error)}`);
        response.status(400).json(error);
      }
    });
  }
}
