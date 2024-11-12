import { DataSource } from "typeorm";
import { Pagamento} from "../models/pagamento";
import { Perfil} from "../models/perfil";
import { Usuario} from "../models/usuario";

export const DevDataSource = new DataSource ({
  type: "postgres",
  host: "localhost",
  port : 5432,
  username: "postgres",
  password: "postgres",
  database: "backend",
  entities: [Pagamento, Perfil, Usuario]

})