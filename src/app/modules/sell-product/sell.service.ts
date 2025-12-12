
import ApiError from "../../errorHelpers/ApiError";
import { Product } from "../product/product.model";
import { ICart } from "./sell.interface";
import { Cart } from "./sell.model"




//   const sellProduct = async(payload:ICart)=>{
//       const totalAmount = payload.items.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );

//     // Set total and changeAmount before saving
//     payload.totalAmount = totalAmount;
//     payload.changeAmount = payload.paymentAmount - totalAmount;
    
//     // Stock Update for create
//     for (const item of payload.items) {
//       const product = await Product.findById(item.product)
//       console.log(product, 'cart-0');
//       if (!product) throw new ApiError(404, "Product not found");

//       if (product.stock < item.quantity)
//         throw new ApiError(400, `OUT_OF_STOCK: ${product.name}`);

//       product.stock -= item.quantity;
//       await product.save();
//     }

//     // Create Cart
//     const cart = await Cart.create(payload);
//     console.log(cart, "cart-1");
//     if (!cart) throw new ApiError(400, "Cart creation failed");
//      await cart.save()
//     return cart;
// }


export const sellProduct = async (payload: ICart) => {
  const { items, paymentAmount, customerId, customerName, barcode } = payload

  // 1️⃣ Calculate totals
  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const changeAmount = paymentAmount - totalAmount

  // 2️⃣ Update stock
  for (const item of items) {
    const product = await Product.findById(item.product)
    if (!product) throw new ApiError(404, `Product not found: ${item.product}`)
    if (product.stock < item.quantity) throw new ApiError(400, `OUT_OF_STOCK: ${product.name}`)

    product.stock -= item.quantity
    await product.save()
  }

  // 3️⃣ Save the order (Cart)
  const cart = await Cart.create({
    customerId,
    customerName,
    barcode,
    items,
    totalAmount,
    paymentAmount,
    changeAmount,
    createdAt: new Date(),
  })
  console.log(cart,);
  if (!cart) throw new ApiError(400, "Cart creation failed")
  return cart
}

const updateSellProduct = async(cartId:string, payload: ICart) => {
    
    const existCart = await Cart.findById(cartId);
    if (!existCart) throw new ApiError(404, "Cart not found");
        // 1️⃣ Restore old stock
    for (const oldItem of existCart.items) {
      const product = await Product.findById(oldItem.product);
      if (product) {
        product.stock += oldItem.quantity; // restore
        await product.save();
      }
    }

    // 2️⃣ Apply new stock
    for (const item of payload.items) {
      const product = await Product.findById(item.product);
      if (!product) throw new ApiError(404, "Product not found");

      if (product.stock < item.quantity)
        throw new ApiError(400, `OUT_OF_STOCK: ${product.name}`);

      product.stock -= item.quantity;
      await product.save();
    }

    // 3️⃣ Calculate totals
    const totalAmount = payload.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    payload.totalAmount = totalAmount;
    payload.changeAmount = payload.paymentAmount - totalAmount;

    // 4️⃣ Update cart
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      payload,
      { new: true, runValidators: true }
    );

    return updatedCart;
  }



const getSellProducts = async()=>{
    // const sellProducts = await Cart.aggregate([
    //     {
    //         $group: {
    //             _id:"$product",
    //             totalQuantity: {$sum: "$items.quantity"}
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "products",
    //             localField: "_id",
    //             foreignField: "_id",
    //             as: "productInfo"
    //         }
    //     },
    //     {
    //         $unwind: "$ProductInfo"
    //     },
    //     {
    //         $project: {
    //             _id: 0,
    //             product: {
    //                 name:"$productInfo.name",
    //                 barcode:"$productInfo.barcode",
    //                 productAvailable: "$productInfo.productAvailable",
    //                 purchasePrice: "$productInfo.purchasePrice",
    //                 price: "$productInfo.price"
    //             },
    //             totalQuantity: 1
    //         }
    //     }
    // ])
    const allSellProducts= await Cart.find({})
    if(!allSellProducts){
        throw new ApiError(401, "Sell Product not Retrieved")
    }
    // console.log(sellProducts, allSellProducts, "sljd");
    return allSellProducts
}
export const SellService ={
    sellProduct,
    getSellProducts,
    updateSellProduct,
}