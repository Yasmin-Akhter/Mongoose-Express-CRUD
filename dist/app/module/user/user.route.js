"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/", user_controller_1.userController.createUser);
router.get("/", user_controller_1.userController.getAllUser);
router.get("/:userId", user_controller_1.userController.getSingleUser);
router.delete("/:userId", user_controller_1.userController.deleteSingleUser);
router.put("/:userId", user_controller_1.userController.updateSingleUser);
router.put("/:userId/orders", user_controller_1.userController.updateOrders);
router.get("/:userId/orders", user_controller_1.userController.getOrders);
router.get("/:userId/orders/total-price", user_controller_1.userController.getTotalPrice);
exports.userRoute = router;
