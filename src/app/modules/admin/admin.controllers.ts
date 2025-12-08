import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import { AdminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";


const profitReport = CatchAsync(async(req:Request, res: Response, next:NextFunction) =>{
    const totalProfit = await AdminService.profitReport();
    console.log(totalProfit, "profit");
    sendResponse(res, {
        statusCode:200,
        success:true,
        message: "Total Profit Report",
        data: totalProfit
    })

})

const getMonthlySales = CatchAsync(async(req:Request, res:Response, next:NextFunction)=>{
      const monthlySales = await AdminService.getMonthlySales();
      sendResponse(res, {
          success: true,
          statusCode:200,
          message: "Monthly Sales Report",
          data: monthlySales
      })
})

const getDailySales =CatchAsync(async(req: Request, res: Response, next:NextFunction) =>{
    const dailySales = await AdminService.getDailySales();
      sendResponse(res, {
          success: true,
          statusCode:200,
          message: "daily Sales Report",
          data: dailySales
      })
})
export const adminController ={
    profitReport,
    getMonthlySales,
    getDailySales
}