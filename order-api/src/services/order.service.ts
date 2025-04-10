import { OrderPayload, OrderResponse } from "../models.interfaces";

export function calculateOrder(data: OrderPayload): OrderResponse {
  const { products, estrato } = data;

  if (
    !Array.isArray(products) ||
    products.length === 0 ||
    estrato < 1 ||
    estrato > 5
  ) {
    throw new Error("Datos inválidos");
  }

  const valid = products.every(
    (p) =>
      p.name &&
      typeof p.name === "string" &&
      typeof p.price === "number" &&
      p.price >= 0 &&
      typeof p.quantity === "number" &&
      p.quantity >= 0
  );

  if (!valid) {
    throw new Error("Cada producto debe tener name, price y quantity válidos");
  }

  const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const shippingFee = [0, 2000, 4000, 6000, 8000, 10000][estrato];
  const discount =
    subtotal >= 200000
      ? subtotal * 0.1
      : subtotal >= 100000
      ? subtotal * 0.05
      : 0;

  const total = subtotal - discount + shippingFee;

  return { subtotal, shippingFee, discount, total };
}
