import { Strategy } from "passport-local";
import { authService } from "./auth.service";

export class LocalStrategy {
  static withEmail(): Strategy {
    return new Strategy(
      { usernameField: "email", passwordField: "password" },
      authService.validateUser,
    );
  }
}
