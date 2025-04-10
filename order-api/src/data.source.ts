import { DataSource } from "typeorm";
import { Product } from "./entities/product";

const isTestEnv = process.env.NODE_ENV === "test";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: isTestEnv ? ":memory:" : "orders.sqlite",
  synchronize: true,
  logging: false,
  entities: [Product],
});
