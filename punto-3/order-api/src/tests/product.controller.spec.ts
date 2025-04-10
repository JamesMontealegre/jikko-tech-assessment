import request from "supertest";
import express from "express";
import { AppDataSource } from "../data.source";
import productRoutes from "../routes/product.routes";
import { Product } from "../entities/product";

const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

beforeEach(async () => {
  await AppDataSource.getRepository(Product).clear();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Product Controller", () => {
  it("creates multiple products", async () => {
    const response = await request(app)
      .post("/api/products")
      .send([
        {
          name: "Zapatos deportivos",
          price: 10000,
          quantity: 2,
        },
        {
          name: "Camiseta básica",
          price: 25000,
          quantity: 1,
        },
      ]);

    expect(response.status).toBe(201);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name", "Zapatos deportivos");
  });

  it("returns all products", async () => {
    await AppDataSource.getRepository(Product).save([
      { name: "Test A", price: 1000, quantity: 1 },
      { name: "Test B", price: 2000, quantity: 2 },
    ]);

    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  it("returns 400 if no products are sent", async () => {
    const response = await request(app).post("/api/products").send([]);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
  it("should return 400 if a product is missing a name", async () => {
    const response = await request(app)
      .post("/api/products")
      .send([{ price: 5000, quantity: 2 }]);
    expect(response.status).toBe(400);
  });
  it("should return 400 if product has negative price or quantity", async () => {
    const response = await request(app)
      .post("/api/products")
      .send([{ name: "Producto inválido", price: -5000, quantity: 2 }]);
    expect(response.status).toBe(400);
  });
  it("should return created products with id, name, price, quantity", async () => {
    const response = await request(app)
      .post("/api/products")
      .send([{ name: "Bolso", price: 30000, quantity: 1 }]);

    expect(response.status).toBe(201);
    expect(response.body[0]).toMatchObject({
      id: expect.any(Number),
      name: "Bolso",
      price: 30000,
      quantity: 1,
    });
  });
  it("should retrieve all products after multiple POSTs", async () => {
    await request(app)
      .post("/api/products")
      .send([
        { name: "A", price: 1000, quantity: 1 },
        { name: "B", price: 2000, quantity: 2 },
      ]);

    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });
  it("should allow creating and retrieving products", async () => {
    const payload = [
      { name: "Tenis", price: 80000, quantity: 1 },
      { name: "Gorra", price: 20000, quantity: 2 },
    ];

    const post = await request(app).post("/api/products").send(payload);
    expect(post.status).toBe(201);

    const get = await request(app).get("/api/products");
    expect(get.body.length).toBeGreaterThanOrEqual(2);
  });
});
