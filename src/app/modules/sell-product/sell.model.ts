import { Schema, model, } from "mongoose";

import { Product } from "../product/product.model";
import { ICart, ICartItem } from "./sell.interface";
import { getProductAvailability } from "../../utils/getProductAvailability";

// Cart item schema
const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
},{_id: false});

// Cart schema
const cartSchema = new Schema<ICart>({
  customerId: {type: String},
  customerName: {type: String},
  name:{type:String, ref:"Product"},
  category: {type:String, ref: "Product"},
  barcode: {type:String, ref:"Product"},
  items: [cartItemSchema],
  totalSellAmount:{type:Number,default:0},
  totalAmount: { type: Number, default: 0 },
  paymentAmount: {type:Number, default:0},
  changeAmount:{type:Number, default:0}
},
  {versionKey: false,
     timestamps: true });


// Auto calculate totalAmount before save
// pre middleware
// cartSchema.pre<ICart>("save" , async function(next) {
//   const product =await Product.findById(this.product);
//   if(product){
//     product.stock -=this.quantity;
//     await product.save();
//   }
//   next()
// })

// Pre-save middleware
// cartSchema.pre<ICart>("save", async function () {
//   // ---- Calculate Total Amount ----
//   this.totalAmount = this.items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   // Change Amount
//   this.changeAmount = this.paymentAmount - this.totalAmount;

//   // ---- Update Product Stock ----
//   for (const item of this.items) {
//     const product = await Product.findById(item.product);
//     if (!product) {
//       throw new Error("Product not found");
//     }

//     // Check stock availability
//     if (product.stock < item.quantity) {
//       throw new Error(`OUT_OF_STOCK: ${product.name}`);
//     }

//     // Reduce stock
//     product.stock -= item.quantity;

//     // Update product availability  
//     // product.productAvailable! = product.stock > 0;

//     await product.save();
//   }
// });
export const Cart = model<ICart>("Cart", cartSchema);
