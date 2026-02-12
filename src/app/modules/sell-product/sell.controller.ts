import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SellService } from "./sell.service";
import { ICart } from "./sell.interface";

const sellProduct = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const productId= req.params.id
    const cart = await SellService.sellProduct(req.body);
    console.log(cart, "cart-2");
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Add to cart  created successfully",
      data: cart,
    });
  },
);

const sellProductUpdate = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload: ICart = {
      ...req.body,
    };
    const cartId = req.params.id;
    const updateSellProduct = await SellService.updateSellProduct(
      cartId,
      payload,
    );
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Add to cart  created successfully",
      data: updateSellProduct,
    });
  },
);
const getSellProducts = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    console.log(query, "query");
    const sellProducts = await SellService.getSellProducts(
      query as Record<string, string>,
    );
    // console.log(sellProducts ,"red");
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sell Product Retrieved is  successfully",
      data: sellProducts,
    });
  },
);

export const sellController = {
  sellProduct,
  getSellProducts,
  sellProductUpdate,
};
