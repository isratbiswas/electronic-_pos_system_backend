import { z } from "zod";

export const ProductAvailabilityEnum = z.enum([
  "IN_STOCK",
  "OUT_OF_STOCK",
  "LOW_STOCK",
]);

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),

  price: z
    .number({
      error: "Price must be a number",
    })
    .nonnegative("Price must be >= 0"),

  purchasePrice: z
    .number({
      error: "Purchase price must be a number",
    })
    .nonnegative("Purchase price must be >= 0"),

  stock: z
    .number({
      error: "Stock must be a number",
    })
    .int("Stock must be an integer")
    .nonnegative("Stock must be >= 0")
    .default(0),

  barcode: z.string().optional(),

  productAvailable: ProductAvailabilityEnum.optional().default("IN_STOCK"),

  description: z.string().min(1, "Description is required"),
  rating: z.number({
    error: "Rating must be a number",
  }),
});
export const updateProductSchema = productSchema.partial();

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
