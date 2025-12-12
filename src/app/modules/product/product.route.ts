import { Router } from "express";
import { ProductControllers } from "./product.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

(router.get(
  "/all-products",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
  ProductControllers.allProducts
),
  router.get(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
    ProductControllers.productDetails
  ),
  router.post("/create-product", ProductControllers.createProduct),
  router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
    ProductControllers.updateProduct
  ),
  router.delete(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.MANAGER),
    ProductControllers.deleteProduct
  ));
router.get("/low-stock", ProductControllers.getLowOrOutOfStockProducts);
export const ProductRoutes = router;
