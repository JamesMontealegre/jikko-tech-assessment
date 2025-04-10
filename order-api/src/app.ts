import "reflect-metadata";
import express from "express";
import orderRoutes from "../src/routes/order.routes";
import productRoutes from "../src/routes/product.routes";
import { AppDataSource } from "./data.source";
import { setupSwagger } from "./swagger";

const app = express();
app.use(express.json());

app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

setupSwagger(app);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => console.log("Error de conexión DB:", error));
