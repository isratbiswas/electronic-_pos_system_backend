import { generateStyledInvoice } from "./invoice.interface";


const createInvoicePDF = async (payload :any) => {
    const {shopInfo, invoiceNumber, customerName, paymentMethod, items, discount, tax, grandTotal, subtotal} = payload;
    const pdfBuffer = await generateStyledInvoice(shopInfo, invoiceNumber, customerName, paymentMethod, items, discount, tax, grandTotal, subtotal)
    return pdfBuffer;
}

export const InvoiceService = {
    createInvoicePDF
}