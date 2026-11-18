import app from "./app";
import config from "./config";
import { iniDB } from "./db";

const main = async () => {
iniDB();



 app.listen(config.port, () => {
  console.log(`The Express server is running on the port ${config.port}`);
});
}

main();