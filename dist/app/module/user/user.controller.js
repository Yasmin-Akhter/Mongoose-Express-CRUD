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
        const userData = req.body;
        const zodParsedData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.userService.createUserIntoDb(zodParsedData);
        res.status(200).json({
            success: true,
            message: "User Created successfully",
            data: result,
        });
    }
    catch (err) {
        let errorMessage = "something went wrong";
        if (err.issues &&
            Array.isArray(err.issues) &&
            err.issues.length > 0 &&
            err.issues[0].message) {
            errorMessage = err.issues[0].message;
        }
        else if (err.message) {
            errorMessage = err.message;
        }
        res.status(404),
            res.send({
                success: false,
                message: "Can't create new user",
                error: {
                    status: 404,
                    description: errorMessage,
                },
            });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: result,
        });
    }
    catch (err) {
        let errorMessage = "something went wrong";
        if (err.issues &&
            Array.isArray(err.issues) &&
            err.issues.length > 0 &&
            err.issues[0].message) {
            errorMessage = err.issues[0].message;
        }
        else if (err.message) {
            errorMessage = err.message;
        }
        res.send({
            success: false,
            message: "No User found",
            error: {
                status: 404,
                description: errorMessage,
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const result = yield user_service_1.userService.getSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: result,
        });
    }
    catch (err) {
        let errorMessage = "something went wrong";
        if (err.issues &&
            Array.isArray(err.issues) &&
            err.issues.length > 0 &&
            err.issues[0].message) {
            errorMessage = err.issues[0].message;
        }
        else if (err.message) {
            errorMessage = err.message;
        }
        res.send({
            success: false,
            message: "No User found",
            error: {
                status: 404,
                description: errorMessage,
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
            data: null,
        });
    }
    catch (err) {
        let errorMessage = "something went wrong";
        if (err.issues &&
            Array.isArray(err.issues) &&
            err.issues.length > 0 &&
            err.issues[0].message) {
            errorMessage = err.issues[0].message;
        }
        else if (err.message) {
            errorMessage = err.message;
        }
        res.send({
            success: false,
            message: "User not found",
            error: {
                status: 404,
                description: errorMessage,
            },
        });
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const userData = req.body;
        const zodParsedData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.userService.updateSingleUserIntoDB(userId, zodParsedData);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result,
        });
    }
    catch (err) {
        let errorMessage = "something went wrong";
        if (err.issues &&
            Array.isArray(err.issues) &&
            err.issues.length > 0 &&
            err.issues[0].message) {
            errorMessage = err.issues[0].message;
        }
        else if (err.message) {
            errorMessage = err.message;
        }
        res.send({
            success: false,
            message: "No User found",
            error: {
                status: 404,
                description: errorMessage,
            },
        });
    }
});
const updateOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const userData = req.body;
        const result = yield user_service_1.userService.updateOrdersIntoDB(userId, userData);
        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: null,
        });
    }
    catch (err) {
        let errorMessage = "something went wrong";
        if (err.issues &&
            Array.isArray(err.issues) &&
            err.issues.length > 0 &&
            err.issues[0].message) {
            errorMessage = err.issues[0].message;
        }
        else if (err.message) {
            errorMessage = err.message;
        }
        res.send({
            success: false,
            message: "Order updating process failed",
            error: {
                status: 404,
                description: errorMessage,
            },
        });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const result = yield user_service_1.userService.getOrdersFromDB(userId);
        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: result,
        });
    }
    catch (err) {
        let errorMessage = "something went wrong";
        if (err.issues &&
            Array.isArray(err.issues) &&
            err.issues.length > 0 &&
            err.issues[0].message) {
            errorMessage = err.issues[0].message;
        }
        else if (err.message) {
            errorMessage = err.message;
        }
        res.send({
            success: false,
            message: "Orders not found",
            error: {
                status: 404,
                description: errorMessage,
            },
        });
    }
});
const getTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const userData = yield user_service_1.userService.getUserInfoFromDB(userId);
        if (userData) {
            const result = yield user_service_1.userService.getTotalPriceFromDB(userId, userData);
            res.status(200).json({
                success: true,
                message: "total price calculated successfully",
                data: result,
            });
        }
        else
            throw new Error("user not found");
    }
    catch (err) {
        let errorMessage = "something went wrong";
        if (err.issues &&
            Array.isArray(err.issues) &&
            err.issues.length > 0 &&
            err.issues[0].message) {
            errorMessage = err.issues[0].message;
        }
        else if (err.message) {
            errorMessage = err.message;
        }
        res.send({
            success: false,
            message: "Total price calculating failed",
            error: {
                status: 404,
                description: errorMessage,
            },
        });
    }
});
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
