import { Document, Types } from "mongoose";


// Cart item interface
export interface ICartItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

// Cart interface
export interface ICart extends Document {
  customerId:string,
  customerName: string,
  name:string,
  barcode:string,
  items: ICartItem[];
  totalAmount: number;
  totalSellAmount: number;
  paymentAmount: number;
  changeAmount: number;
}