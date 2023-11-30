import express from "express";
import { userController } from "./user.controller";

const router = express.Router();
router.post("/", userController.createUser);
router.get("/", userController.getAllUser);
router.get("/:userId", userController.getSingleUser);
router.delete("/:userId", userController.deleteSingleUser);
router.put("/:userId", userController.updateSingleUser);
router.put("/:userId/orders", userController.updateOrders);
router.get("/:userId/orders", userController.getOrders);

export const userRoute = router;
