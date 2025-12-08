import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import { InvoiceService } from "./invoice.service";
import { sendResponse } from "../../utils/sendResponse";


const  downloadInvoice = CatchAsync(async(req:Request, res:Response, next: NextFunction) =>{
    const pdfBuffer = await InvoiceService.createInvoicePDF(req.body);
    sendResponse(res, {
        success: true, 
        statusCode:201,
        message:"Invoice created successfully",
        data:pdfBuffer
    })
})

export const  InvoiceController ={
    downloadInvoice
}