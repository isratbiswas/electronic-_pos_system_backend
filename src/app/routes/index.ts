import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProductRoutes } from "../modules/product/product.route";
import { SellRoutes } from "../modules/sell-product/sell.route";
import { AdminRoutes } from "../modules/admin/admin.route";


export const router = Router();

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route:AuthRoutes
    },
    {
        path: "/product",
        route:ProductRoutes
    },
    {
        path:"/sell",
        route: SellRoutes
    },
    {
        path: '/sales',
        route:AdminRoutes
    }
]

moduleRoutes.forEach((route) =>{
    router.use(route.path, route.route)
})