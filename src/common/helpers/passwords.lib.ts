import * as bcrypt from "bcrypt";

export class Passwords {
  static async genPass(password: string): Promise<string> {
    const hash: string = await bcrypt.hash(password, 12);
    return hash;
  }

  static async comparePass(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
