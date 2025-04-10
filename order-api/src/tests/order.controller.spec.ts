import request from "supertest";
import express from "express";
import orderRoutes from "../routes/order.routes";

const app = express();
app.use(express.json());
app.use("/api/orders", orderRoutes);

describe("Order Controller", () => {
  it("should return 200 and the order result when data is valid", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({
        estrato: 3,
        products: [{ name: "Zapatos", price: 20000, quantity: 2 }],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("subtotal");
    expect(response.body).toHaveProperty("shippingFee");
    expect(response.body).toHaveProperty("discount");
    expect(response.body).toHaveProperty("total");
  });

  it("should return 400 if products array is empty", async () => {
    const response = await request(app).post("/api/orders").send({
      estrato: 3,
      products: [],
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/inválidos/i);
  });

  it("should return 400 if a product is missing name", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({
        estrato: 2,
        products: [{ price: 10000, quantity: 1 }], // sin name
      });

    expect(response.status).toBe(400);
  });

  it("should return 400 if a product has negative price or quantity", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({
        estrato: 2,
        products: [{ name: "Producto malo", price: -5000, quantity: 1 }],
      });

    expect(response.status).toBe(400);
  });

  it("should return 400 if estrato is outside valid range", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({
        estrato: 6,
        products: [{ name: "Producto válido", price: 5000, quantity: 1 }],
      });

    expect(response.status).toBe(400);
  });

  it("should return 400 if payload is malformed", async () => {
    const response = await request(app).post("/api/orders").send({
      randomField: 123,
    });

    expect(response.status).toBe(400);
  });
});
