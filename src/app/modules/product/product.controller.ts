import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import { ProductService } from "./product.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { IProduct } from "./product.interface";

const createProduct = CatchAsync(async(req:Request, res: Response, next:NextFunction) =>{
    const payload : IProduct= {
        ...req.body,
    }
    console.log(payload, "product-1");
    const product= await ProductService.createProduct(payload);
    console.log(product, "product-1");
    sendResponse(res, {
        success:true,
        statusCode: httpStatus.CREATED,
        message: "Product created successfully",
        data: product
    })
})

const allProducts = CatchAsync(async(req:Request, res: Response, next:NextFunction) =>{
       const products= await ProductService.allProducts();
       console.log(products, "data");
        sendResponse(res, {
        success:true,
        statusCode: httpStatus.OK,
        message: "All Products retrieved successfully",
        data: products
    })
})

const updateProduct = CatchAsync(async(req:Request, res: Response, next:NextFunction) =>{
     const payload : IProduct= {
        ...req.body,
    }
    const productId = req.params.id;
    const product= await ProductService.updateProduct(productId,payload);
    console.log(product);
    sendResponse(res, {
        success:true,
        statusCode: httpStatus.OK,
        message: "Product updated successfully",
        data: product
    })

})
const deleteProduct = CatchAsync(async(req:Request, res: Response, next:NextFunction) =>{
    const productId = req.params.id;
  const product = await ProductService.productDetails(productId)
  console.log(productId,'simi');
    sendResponse(res, {
        success:true,
        statusCode: httpStatus.OK,
        message: " Product deleted  successfully",
        data: null
    })
})

const productDetails= CatchAsync(async(req:Request, res: Response, next:NextFunction) =>{
  const productId = req.params.id;
  const product = await ProductService.productDetails(productId)
  
    sendResponse(res, {
        success:true,
        statusCode: httpStatus.OK,
        message: " Product Details is retrieved successfully",
        data: product
    })
})

const getLowOrOutOfStockProducts = CatchAsync(async(req:Request, res: Response, next:NextFunction) =>{
    const result = await ProductService.getLowOrOutOfStockProducts();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Low or out-of-stock products fetched successfully",
        data: result,
      });
})
export const ProductControllers = {
    createProduct,
    allProducts,
    updateProduct,
    deleteProduct,
    productDetails,
    getLowOrOutOfStockProducts
}