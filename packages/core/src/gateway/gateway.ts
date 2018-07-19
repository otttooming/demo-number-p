import { StatusController } from "./controllers/StatusController";
import { PersonsController } from "./controllers/PersonsController";

const gw = {
  status: new StatusController(),
  persons: new PersonsController(),
};

export default gw;
