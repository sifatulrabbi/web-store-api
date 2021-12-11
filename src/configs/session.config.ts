import session from "express-session";
import { Express } from "express";
import { config } from "./config";
import MongoStore from "connect-mongo";

export class SessionConfig {
  static use(app: Express): void {
    new SessionConfig(app);
  }

  constructor(private readonly app: Express) {
    this.app.use(
      session({
        resave: false,
        secret: config.sessionSecret,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 24 },
        store: MongoStore.create({
          mongoUrl: config.mongoDbUri,
        }),
      }),
    );
  }
}
