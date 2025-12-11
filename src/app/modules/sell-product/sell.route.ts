import { Router } from "express";
import { sellController } from "./sell.controller";

 // your auth middleware

const router = Router();

router.post("/sell-product",  sellController.sellProduct);
router.get("/all-orders",  sellController.getSellProducts);
router.patch("/update/:id",  sellController.sellProductUpdate);
// router.delete("/remove/:productId",  CartController.removeItem);
// router.delete("/clear",  CartController.clearCart);

export const SellRoutes = router;
