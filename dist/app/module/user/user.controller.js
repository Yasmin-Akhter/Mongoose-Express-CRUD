"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_validation_1 = __importDefault(require("./user.validation"));
const user_service_1 = require("./user.service");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userData } = req.body;
        const zodParsedData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.userService.createUserIntoDb(zodParsedData);
        res.status(200).json({
            success: true,
            message: "User Created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(404),
            res.send({
                success: false,
                message: "Something went wrong",
                error: {
                    status: 404,
                    description: "Can't create new user",
                },
            });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.getAllUserFromDB();
        const totalUser = result.length;
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            total: totalUser,
            data: result,
        });
    }
    catch (err) {
        res.send({
            success: false,
            message: "User not found",
            error: {
                status: 404,
                description: "User not found",
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const result = yield user_service_1.userService.getSingleUserFromDB(userId);
        console.log(userId);
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(404),
            res.send({
                success: false,
                message: err.message || "User not found",
                error: {
                    status: 404,
                    description: "User not found",
                },
            });
    }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const result = yield user_service_1.userService.deleteSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(404),
            res.send({
                success: false,
                message: "User not found",
                error: {
                    status: 404,
                    description: "User not found",
                },
            });
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const { user: userData } = req.body;
        console.log(req.body.user);
        const zodParsedData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.userService.updateSingleUserIntoDB(userId, zodParsedData);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(404),
            res.send({
                success: false,
                message: "User not found",
                error: {
                    status: 404,
                    description: "User not found",
                },
            });
    }
});
const updateOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const { user: userData } = req.body;
        const userOrders = userData.orders;
        const result = yield user_service_1.userService.updateOrdersIntoDB(userId, userOrders);
        console.log(userId, userOrders);
        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: result,
        });
    }
    catch (err) {
        res.send({
            success: false,
            message: "User not found",
            error: {
                status: 404,
                description: "User not found",
            },
        });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const result = yield user_service_1.userService.getOrdersFromDB(userId);
        console.log(userId);
        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(404),
            res.send({
                success: false,
                message: "orders not found",
                error: {
                    status: 404,
                    description: "orders not found",
                },
            });
    }
});
const getTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Incoming request:", req);
        const userId = parseInt(req.params.userId, 10);
        const userData = yield user_service_1.userService.getSingleUserFromDB(userId);
        const result = yield user_service_1.userService.getTotalPriceFromDB(userId, userData);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(404),
            res.send({
                success: false,
                message: "User not found",
                error: {
                    status: 404,
                    description: "User not found",
                },
            });
    }
});
// const getTotalPrice = async (req: Request, res: Response) => {
// 	try {
// 		const userId = parseInt(req.params.userId, 10);
// 		console.log("userId ", userId);
// 		const { user: userData } = req.body;
// 		console.log("req body ", req.body);
// 		const userOrders = userData.orders;
// 		const result = await userService.getTotalPriceFromDB(userId, userOrders);
// 		console.log(userId, userOrders);
// 		res.status(200).json({
// 			success: true,
// 			message: " total price calculated successfully",
// 			data: result,
// 		});
// 	} catch (err: any) {
// 		console.log(err);
// 		res.send({
// 			success: false,
// 			message: err.message || "User not found",
// 			error: {
// 				status: 404,
// 				description: "User not found",
// 			},
// 		});
// 	}
// };
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    deleteSingleUser,
    updateSingleUser,
    updateOrders,
    getOrders,
    getTotalPrice,
};
