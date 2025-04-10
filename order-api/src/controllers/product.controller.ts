import { RequestHandler } from "express";
import { AppDataSource } from "../data.source";
import { Product } from "../entities/product";

export const createProducts: RequestHandler = async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      res
        .status(400)
        .json({ error: "Se requiere una lista de productos válida." });
      return;
    }

    const invalid = products.some(
      (p) =>
        !p.name ||
        typeof p.name !== "string" ||
        typeof p.price !== "number" ||
        p.price < 0 ||
        typeof p.quantity !== "number" ||
        p.quantity < 0
    );

    if (invalid) {
      res.status(400).json({
        error:
          "Todos los productos deben tener name, price >= 0, y quantity >= 0.",
      });
      return;
    }

    const productRepo = AppDataSource.getRepository(Product);
    const savedProducts = await productRepo.save(products);

    res.status(201).json(savedProducts);
  } catch (error) {
    res.status(500).json({ error: "Error al crear productos", details: error });
  }
};

export const getAllProducts: RequestHandler = async (_req, res) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const products = await productRepo.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener productos", details: error });
  }
};
