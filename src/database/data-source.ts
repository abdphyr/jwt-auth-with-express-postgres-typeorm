import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, RefreshToken } from "../entity";

const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "expresspg",
  password: "expresspg",
  database: "jwt_auth_typeorm",
  synchronize: true,
  logging: false,
  entities: [User, RefreshToken],
  migrations: [],
  subscribers: [],
})
export function initDataSource() {
  appDataSource
    .initialize()
    .then(() => console.log("Init datasource..."))
    .catch(error => console.log(error));
}

export const UserRepository = appDataSource.getRepository(User);
export const RefreshTokenRepository = appDataSource.getRepository(RefreshToken);