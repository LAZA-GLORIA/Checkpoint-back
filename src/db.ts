import { createConnection, ConnectionOptions } from "typeorm";
import { entities } from "./entities";

export const initializeDatabase = async (): Promise<void> => {
  try {
    const options: ConnectionOptions = {
      type: "sqlite",
      database: "database.sqlite",
      synchronize: true,
      entities,
      logging: ["error"],
    };

    await createConnection(options);
    console.log("Connected to SQLite database");
  } catch (error) {
    console.log("Failed to connect to SQLite database");
    console.error(error);
  }
};
