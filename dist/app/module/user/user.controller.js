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
        res.status(500).json({
            success: false,
            message: err.message || "User creation failed",
            data: err,
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "User retrieved failed",
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
        res.status(500).json({
            success: false,
            message: err.message || "User not found",
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
        // res.status(500).json({
        // 	success: false,
        // 	message: err.message || "User not found",
        // });
        throw {
            success: false,
            message: "User not found",
            err: {
                code: 404,
                description: "User not Found",
            },
        };
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const { user: userData } = req.body;
        const zodParsedData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.userService.updateSingleUserIntoDB(userId, zodParsedData);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result,
        });
    }
    catch (err) {
        throw {
            success: false,
            message: "User not found",
            err: {
                code: 404,
                description: "User not Found",
            },
        };
    }
});
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    deleteSingleUser,
    updateSingleUser,
};
