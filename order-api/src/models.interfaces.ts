export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface OrderPayload {
  estrato: number;
  products: Product[];
}

export interface OrderResponse {
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
}
