import express from "express";
import { HomeController } from "./home";
import { AuthController } from "./auth";
import { UsersController } from "./users";
import { ShopsController } from "./shops";
import { ConnectDb, PassportConfig, SessionConfig } from "./configs";

export class App {
  private APP!: express.Express;
  private PORT!: number;

  constructor() {
    this.PORT = 5000;
    this.APP = express();

    ConnectDb.connect();
    this.useMiddlewares();
    this.useRouters();
  }

  private useMiddlewares(): void {
    this.APP.use(express.json());
    this.APP.use(express.urlencoded({ extended: true }));

    SessionConfig.use(this.APP);
    PassportConfig.use(this.APP);
  }

  private useRouters(): void {
    HomeController.use(this.APP);
    UsersController.use(this.APP);
    AuthController.use(this.APP);
    ShopsController.use(this.APP);
  }

  start(): void {
    this.APP.listen(this.PORT, (): void => {
      console.log(`Server is running on port: ${this.PORT}`);
    });
  }
}

const app: App = new App();
app.start();
