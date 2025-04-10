import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Order API",
      version: "1.0.0",
      description:
        "API para pedidos con descuentos y cálculo de envío por estrato",
    },
  },
  apis: ["./src/routes/*.ts"],
});

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
