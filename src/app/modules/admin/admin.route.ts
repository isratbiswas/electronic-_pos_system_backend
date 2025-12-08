import { Router } from "express";
import { adminController } from "./admin.controllers";


const router = Router();

router.get("/profit", adminController.profitReport);

router.get("/monthly", adminController.getMonthlySales);
router.get("/daily", adminController.getDailySales);


export const  AdminRoutes = router;