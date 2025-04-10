import { Request, Response } from "express";
import { calculateOrder } from "../services/order.service";
import { OrderPayload } from "../models.interfaces";

export const handleOrder = (
  req: Request<{}, {}, OrderPayload>,
  res: Response
) => {
  try {
    const result = calculateOrder(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
