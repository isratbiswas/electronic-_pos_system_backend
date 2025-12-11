import { z } from "zod";

/** Cart Item */
export const cartItemSchema = z.object({
  product: z.string(),      // ObjectId as string
  quantity: z.number(),
  price: z.number(),
});

/** Cart */
export const cartSchema = z.object({
  customerId: z.string(),
  customerName: z.string(),
  name: z.string(),
  category: z.string(),
  barcode: z.string(),
  items: z.array(cartItemSchema),
  totalAmount: z.number(),
  totalSellAmount: z.number(),
  paymentAmount: z.number(),
  changeAmount: z.number(),
});

/** Types (optional) */
export type CartInput = z.infer<typeof cartSchema>;
export type CartItemInput = z.infer<typeof cartItemSchema>;