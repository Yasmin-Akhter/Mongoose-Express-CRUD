import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { TUser, UserModel } from "./user.interface";
export const orderSchema = new Schema({
	productName: {
		type: String,
	},
	price: {
		type: Number,
	},
	quantity: {
		type: Number,
	},
});
export const userSchema = new Schema<TUser, UserModel>({
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
		},
		lastName: {
			type: String,
			required: [true, "last name is required"],
			trim: true,
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
	orders: {
		type: [orderSchema],
		default: [],
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	totalPrice: {
		type: Number,
		default: 0,
	},
});
userSchema.pre("save", async function (next) {
	const user = this;
	user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
	next();
});

userSchema.set("toJSON", {
	transform: function (doc, ret) {
		delete ret.password;
		return ret;
	},
});
userSchema.pre("find", async function (next) {
	const query = this;
	query.find({ isDeleted: { $ne: true } });
	next();
});
userSchema.pre("findOne", async function (next) {
	const query = this;
	query.find({ isDeleted: { $ne: true } });
	next();
});
userSchema.pre("aggregate", async function (next) {
	this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
	next();
});
userSchema.statics.isExists = async function (id: number) {
	const existingUser = await User.findOne({ userId: id });
	return existingUser;
};

export const User = model<TUser, UserModel>("User", userSchema);
