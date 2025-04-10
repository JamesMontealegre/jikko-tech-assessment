import { Router } from "express";
import {
  createProducts,
  getAllProducts,
} from "../controllers/product.controller";

const router = Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear una lista de productos
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *                 - price
 *                 - quantity
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Zapatos deportivos"
 *                 price:
 *                   type: number
 *                   example: 10000
 *                 quantity:
 *                   type: number
 *                   example: 2
 *     responses:
 *       201:
 *         description: Productos creados correctamente
 *       400:
 *         description: Lista inválida de productos
 *       500:
 *         description: Error del servidor
 */
router.post("/", createProducts);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: number
 *       500:
 *         description: Error del servidor
 */
router.get("/", getAllProducts);

export default router;
