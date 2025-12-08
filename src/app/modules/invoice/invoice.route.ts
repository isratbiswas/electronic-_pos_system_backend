import { Router } from "express";
import { InvoiceController } from "./invoice.controller";

const router = Router();
router.post("/download", InvoiceController.downloadInvoice)

export const InvoiceRoutes= router;