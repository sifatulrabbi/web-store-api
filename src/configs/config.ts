import * as dotenv from "dotenv";

export class Config {
  private readonly PORT!: number;
  private readonly MONGODB_URI!: string;
  private readonly SESSION_SECRET!: string;
  private readonly SENDER_EMAIL!: string;
  private readonly SENDER_EMAIL_PASS!: string;
  private readonly NODE_ENV!: string;

  constructor() {
    dotenv.config();

    this.NODE_ENV = process.env["NODE_ENV"] || "development";
    this.PORT = parseInt(process.env["PORT"] || "5001", 10);
    this.MONGODB_URI = process.env["MONGODB_URI"] || "mongodb://127.0.0.1:27017/store-api";
    this.SESSION_SECRET = process.env["SESSION_SECRET"] || "keyboard cat";
    this.SENDER_EMAIL = process.env["SENDER_EMAIL"] || "john.doe@email.com";
    this.SENDER_EMAIL_PASS = process.env["SENDER_EMAIL_PASS"] || "john_doe";
  }

  get port(): number {
    return this.PORT;
  }

  get mongoDbUri(): string {
    return this.MONGODB_URI;
  }

  get sessionSecret(): string {
    return this.SESSION_SECRET;
  }

  get senderEmail(): string {
    return this.SENDER_EMAIL;
  }

  get senderEmailPass(): string {
    return this.SENDER_EMAIL_PASS;
  }

  isProduction(): boolean {
    return this.NODE_ENV === "production";
  }
}

export const config: Config = new Config();
