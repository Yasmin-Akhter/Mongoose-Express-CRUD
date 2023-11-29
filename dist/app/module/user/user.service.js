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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // if (await User.isExists(userData.userId)) {
    // 	throw new Error("User already exists");
    // }
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().select({
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId }).select({
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    // if (await User.isExists(userId)) {
    // 	throw new Error("User doesn't exists");
    // }
    return result;
});
const deleteSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateOne({ userId }, { isDeleted: true });
    // if (await User.isExists(userId)) {
    // 	throw new Error("User doesn't exists");
    // }
    return result;
});
exports.userService = {
    createUserIntoDb,
    getAllUserFromDB,
    getSingleUserFromDB,
    deleteSingleUserFromDB,
};
