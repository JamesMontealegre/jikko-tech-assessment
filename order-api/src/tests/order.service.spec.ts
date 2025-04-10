import { calculateOrder } from "../services/order.service";

describe("Order Calculation", () => {
  it("calculates order correctly for estrato 3", () => {
    const result = calculateOrder({
      estrato: 3,
      products: [
        { name: "Gorra Nike", price: 10000, quantity: 2 },
        { name: "Jogger Adidas", price: 5000, quantity: 1 },
      ],
    });

    expect(result.subtotal).toBe(25000);
    expect(result.discount).toBe(0);
    expect(result.shippingFee).toBe(6000);
    expect(result.total).toBe(31000);
  });

  it("applies 5% discount for subtotal between 100000 and 199999", () => {
    const result = calculateOrder({
      estrato: 2,
      products: [
        { name: "Chaqueta", price: 50000, quantity: 1 },
        { name: "Pantalón", price: 55000, quantity: 1 },
      ],
    });

    expect(result.subtotal).toBe(105000);
    expect(result.discount).toBe(5250);
    expect(result.shippingFee).toBe(4000);
    expect(result.total).toBe(103750);
  });

  it("applies 10% discount for subtotal greater than 200000", () => {
    const result = calculateOrder({
      estrato: 4,
      products: [
        { name: "TV", price: 150000, quantity: 1 },
        { name: "Laptop", price: 100000, quantity: 1 },
      ],
    });

    expect(result.subtotal).toBe(250000);
    expect(result.discount).toBe(25000);
    expect(result.shippingFee).toBe(8000);
    expect(result.total).toBe(233000);
  });

  it("throws error for invalid estrato", () => {
    expect(() =>
      calculateOrder({
        estrato: 0,
        products: [{ name: "X", price: 1000, quantity: 1 }],
      })
    ).toThrow("Datos inválidos");
  });

  it("throws error if product name is missing", () => {
    expect(() =>
      calculateOrder({
        estrato: 1,
        products: [{ name: "", price: 1000, quantity: 1 }],
      })
    ).toThrow("Cada producto debe tener name, price y quantity válidos");
  });
});
