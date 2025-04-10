import { Router } from "express";
import { handleOrder } from "../controllers/order.controller";

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Calcula el total de un pedido
 *     tags:
 *       - Órdenes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estrato
 *               - products
 *             properties:
 *               estrato:
 *                 type: integer
 *                 example: 3
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - price
 *                     - quantity
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Zapatos deportivos"
 *                     price:
 *                       type: number
 *                       example: 10000
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       200:
 *         description: Resultado del pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subtotal:
 *                   type: number
 *                 shippingFee:
 *                   type: number
 *                 discount:
 *                   type: number
 *                 total:
 *                   type: number
 *       400:
 *         description: Datos inválidos
 */

const router = Router();
router.post("/", handleOrder);
export default router;
