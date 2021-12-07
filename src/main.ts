import express from "express";
import { MainController, UsersController } from "./apps";
import { ConnectDb } from "./config";

export class App {
  private APP!: express.Express;
  private PORT!: number;

  public constructor() {
    this.PORT = 5000;
    this.APP = express();

    ConnectDb.connect();
    this.useMiddlewares();
    this.useRouters();
  }

  private useMiddlewares(): void {
    this.APP.use(express.json());
    this.APP.use(express.urlencoded({ extended: true }));
  }

  private useRouters(): void {
    this.APP.use(MainController.use());
    this.APP.use(UsersController.use());
  }

  start(): void {
    this.APP.listen(this.PORT, (): void => {
      console.log(`Server is running on port: ${this.PORT}`);
    });
  }
}

const app: App = new App();
app.start();
