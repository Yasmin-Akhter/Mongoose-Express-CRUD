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
exports.User = exports.userSchema = exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
exports.orderSchema = new mongoose_1.Schema({
    ProductName: {
        type: String,
    },
    Price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
});
exports.userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, "User Id is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "user name is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false,
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, "first name is required"],
            trim: true,
            lastName: {
                type: String,
                required: [true, "last name is required"],
                trim: true,
            },
        },
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: {
        type: [String],
        default: [],
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    orders: [exports.orderSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
exports.userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.salt_rounds));
        next();
    });
});
exports.userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});
exports.userSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this;
        query.find({ isDeleted: { $ne: true } });
        next();
    });
});
exports.userSchema.pre("findOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this;
        query.find({ isDeleted: { $ne: true } });
        next();
    });
});
exports.userSchema.pre("aggregate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
        next();
    });
});
exports.userSchema.statics.isExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId: id });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
