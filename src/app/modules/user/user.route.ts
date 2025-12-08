import { Router } from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
import { validateRequest } from "../../middlewares/validRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";


const router = Router();

router.post("/register", UserController.createUser);
router.get("/me" , checkAuth(...Object.values(Role)), UserController.getMe)
router.patch(
  "/me",
  checkAuth(...Object.values(Role)),
  UserController.updateProfile
);
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserController.updateUser
);

export const UserRoutes= router;
//  validateRequest(createUserZodSchema),