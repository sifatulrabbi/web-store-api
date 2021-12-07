import mongoose from "mongoose";
import { config } from "../config";

export class ConnectDb {
  static async connect(): Promise<void> {
    try {
      await mongoose.connect(config.mongoDbUri, { autoIndex: false, autoCreate: false });
      console.log("Connected to MongoDb database");
    } catch (err) {
      console.log("Unable to connect to db\n", err);
      process.exit(1);
    }
  }
}
