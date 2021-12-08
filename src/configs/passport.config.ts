import passport from "passport";
import { Express } from "express";
import { LocalStrategy } from "../auth";
import { authService } from "../auth";

export class PassportConfig {
  static use(app: Express): void {
    new PassportConfig(app);
  }

  constructor(private readonly app: Express) {
    passport.use(LocalStrategy.withEmail());

    passport.serializeUser<string>(authService.serializer);
    passport.deserializeUser<string>(authService.deserializer);

    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
}
