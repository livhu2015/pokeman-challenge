import { Server } from "@overnightjs/core";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import * as bodyParser from "body-parser";
import cors from 'cors'
import { PokeController } from "./controllers/PokeController";
import { swaggerOptions } from './config/swagger';

export default class MainServer extends Server {
  constructor(logger: any) {
    super();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors())
    this.app.use(morgan("dev"));

    this.setUpSwagger();
    this.setupControllers();
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log("Server listening on port: " + port);
    });
  }

  private setupControllers(): void {
    super.addControllers([new PokeController()]);
  }

  private setUpSwagger() {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));
  }
}
