import { DataSource } from "typeorm";
import { Task } from "../models/pagamento";

export const DevDataSource = new DataSource ({
  type: "postgres",
  host: "localhost",
  port : 5432,
  username: "postgres",
  password: "postgres",
  database: "backend",
  entities: [Task]

})