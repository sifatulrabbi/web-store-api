import { IUserDocument, IUserPreview } from "../typings";
import { usersService } from "../users";
import { Passwords } from "../common";

type IDone = (
  err: unknown | null,
  user?: IUserPreview | false,
  verifyOptions?: { message: string },
) => void;

export class AuthService {
  public async validateUser(email: string, password: string, done: IDone): Promise<void> {
    try {
      const user: IUserDocument | null = await usersService.findOne({ email });

      if (!user) {
        throw "User not found please sign up";
      }

      if (!(await Passwords.comparePass(password, user.password))) {
        throw "Email and Password don't match";
      }

      done(null, usersService.trimUser(user));
    } catch (err: unknown) {
      done(null, false, { message: String(err) });
    }
  }

  public serializer(user: IUserPreview, done: (err: unknown, userId?: string) => void): void {
    if (!user) {
      done("Session expired please login again");
      return;
    }
    done(null, user._id);
  }

  public async deserializer(
    userId: string,
    done: (err: unknown, user?: IUserPreview) => void,
  ): Promise<void> {
    if (!userId) {
      done("Session expired please login again");
      return;
    }

    const user: IUserDocument = await usersService.findOne({ _id: userId });
    if (!user) {
      done("User not found");
      return;
    }

    done(null, usersService.trimUser(user));
  }
}

export const authService: AuthService = new AuthService();
