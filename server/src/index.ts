import * as path from "path";
import { config } from "dotenv-safe";
config({
  path: path.join(__dirname, "../.env"),
  sample: path.join(__dirname, "../.env.example"),
  allowEmptyValues: true,
});

import Server from "./Server";

const logger = {
  log(err: Error) {
    // tslint:disable-next-line:no-console
    console.error(err);
  },
};

process.on("uncaughtException", (err) => {
  logger.log(err);
});
process.on("uncaughtRejection", (err, promise) => {
  logger.log(err);
});

const server = new Server(logger);
server.start(3000);
