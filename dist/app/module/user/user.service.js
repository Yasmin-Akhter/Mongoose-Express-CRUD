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
exports.userService = void 0;
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const createUserIntoDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isExists(userData.userId)) {
        throw new Error("User already exists");
    }
    const newUser = yield user_model_1.User.create(userData);
    const result = yield user_model_1.User.findById(newUser.id).select({
        orders: 0,
        _id: 0,
    });
    return result;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}).select({
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
        _id: 0,
    });
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield user_model_1.User.isExists(userId);
    if (!check) {
        throw new Error("User doesn't exist");
    }
    const result = yield user_model_1.User.findOne({ userId }).select({
        orders: 0,
        totalPrice: 0,
        _id: 0,
    });
    if (result == null) {
        throw new Error("User does not exists");
    }
    return result;
});
const deleteSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield user_model_1.User.isExists(userId);
    if (!check) {
        throw new Error("User doesn't exist");
    }
    const result = yield user_model_1.User.deleteOne({ userId });
    return result;
});
const updateSingleUserIntoDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield user_model_1.User.isExists(userId);
    if (!check) {
        throw new Error("User doesn't exist");
    }
    if (userData.password) {
        const hashedPass = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.salt_rounds));
        userData.password = hashedPass;
    }
    const updatedUser = yield user_model_1.User.updateOne({ userId }, { $set: userData });
    if (updatedUser.modifiedCount == 1) {
        const result = yield user_model_1.User.find({ userId }).select({
            orders: 0,
            totalPrice: 0,
        });
        return result;
    }
});
const updateOrdersIntoDB = (userId, userOrders) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield user_model_1.User.isExists(userId);
    if (!check) {
        throw new Error("User doesn't exist");
    }
    const result = yield user_model_1.User.updateOne({ userId }, { $addToSet: { orders: { $each: [userOrders] } } });
    return result;
});
const getOrdersFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield user_model_1.User.isExists(userId);
    if (!check) {
        throw new Error("User doesn't exist");
    }
    const result = yield user_model_1.User.findOne({ userId }).select({ orders: 1, _id: 0 });
    return result;
});
const getUserInfoFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId });
    return result;
});
const getTotalPriceFromDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield user_model_1.User.isExists(userId);
    if (!check) {
        throw new Error("User doesn't exist");
    }
    const userOrders = userData.orders;
    let totalPrice = 0;
    if (userOrders.length > 0) {
        userOrders.forEach((order) => {
            totalPrice = totalPrice + order.price * order.quantity;
        });
        const result = yield user_model_1.User.findOneAndUpdate({ userId }, { $set: { totalPrice: totalPrice } }, { new: true }).select({ totalPrice: 1, _id: 0 });
        return result;
    }
    else
        throw new Error("No orders available");
});
exports.userService = {
    createUserIntoDb,
    getAllUserFromDB,
    getSingleUserFromDB,
    deleteSingleUserFromDB,
    updateSingleUserIntoDB,
    updateOrdersIntoDB,
    getOrdersFromDB,
    getTotalPriceFromDB,
    getUserInfoFromDB,
};
