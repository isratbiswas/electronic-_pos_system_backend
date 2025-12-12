// import { NextFunction, Request, Response } from "express";
// import { CartService } from "./cart.service";
// import { JwtPayload } from "jsonwebtoken";
// import { CatchAsync } from "../../utils/CatchAsync";
// import { sendResponse } from "../../utils/sendResponse";

import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SellService } from "./sell.service";
import { ICart } from "./sell.interface";

// // export const CartController = {
// //   addToCart: async (req: Request, res: Response) => {
// //     const { productId, quantity } = req.body;
// //     const userId = (req.user as JwtPayload).userId;

// //     const cart = await CartService.addToCart(userId, productId, quantity);

// //     res.status(200).json({ success: true, message: "Product added to cart", data: cart });
// //   },

// //   getCart: async (req: Request, res: Response) => {
// //     const userId = req.user.id;
// //     const cart = await CartService.getCart(userId);
// //     res.status(200).json({ success: true, data: cart });
// //   },

// //   updateQuantity: async (req: Request, res: Response) => {
// //     const { productId, quantity } = req.body;
// //     const userId = req.user.id;

// //     const cart = await CartService.updateQuantity(userId, productId, quantity);
// //     res.status(200).json({ success: true, message: "Quantity updated", data: cart });
// //   },

// //   removeItem: async (req: Request, res: Response) => {
// //     const { productId } = req.params;
// //     const userId = req.user.id;

// //     const cart = await CartService.removeFromCart(userId, productId);
// //     res.status(200).json({ success: true, message: "Product removed", data: cart });
// //   },

// //   clearCart: async (req: Request, res: Response) => {
// //     const userId = req.user.id;
// //     const cart = await CartService.clearCart(userId);
// //     res.status(200).json({ success: true, message: "Cart cleared", data: cart });
// //   },
// // };


// const addToCart = CatchAsync(async(req:Request, res:Response, next:NextFunction) =>{
//     const decodedToken = req.user as JwtPayload;
//     const cart = await CartService.addToCart(req.body, decodedToken.userId);
//     sendResponse(res, {
//         statusCode: 201,
//         success: true,
//         message: "Add to cart  created successfully",
//         data: cart,
//     });


// })

// export const CartController ={
//     addToCart
// }

const sellProduct = CatchAsync(async(req:Request, res:Response, next:NextFunction) =>{
    // const productId= req.params.id
    const cart= await SellService.sellProduct(req.body)
    console.log(cart , "cart-2");
    sendResponse(res, {
          statusCode: 201,
        success: true,
        message: "Add to cart  created successfully",
        data: cart,
    })
})

const sellProductUpdate = CatchAsync(async(req:Request, res:Response, next: NextFunction) =>{
     const payload : ICart= {
            ...req.body,
        }
    const cartId= req.params.id;
    const updateSellProduct= await SellService.updateSellProduct(cartId,payload)
       sendResponse(res, {
       statusCode: 201,
        success: true,
        message: "Add to cart  created successfully",
        data: updateSellProduct
    })
})
const getSellProducts =CatchAsync(async(req:Request, res: Response, next:NextFunction) =>{
    const sellProducts = await SellService.getSellProducts();
    // console.log(sellProducts ,"red");
    sendResponse(res, {
          statusCode: 200,
        success: true,
        message: "Sell Product Retrieved is  successfully",
        data: sellProducts,
    })
})

export const sellController = {
    sellProduct,
    getSellProducts,
    sellProductUpdate
}