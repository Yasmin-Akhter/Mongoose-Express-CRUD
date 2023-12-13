import express from "express";
import { TOrder, TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import { any, object } from "zod";
import config from "../../config";

const createUserIntoDb = async (userData: TUser) => {
	if (await User.isExists(userData.userId)) {
		throw new Error("User already exists");
	}
	const newUser = await User.create(userData);
	const result = await User.findById(newUser.id).select({
		orders: 0,
		_id: 0,
	});
	return result;
};
const getAllUserFromDB = async () => {
	const result = await User.find({}).select({
		username: 1,
		fullName: 1,
		age: 1,
		email: 1,
		address: 1,
		_id: 0,
	});

	return result;
};
const getSingleUserFromDB = async (userId: number) => {
	const check = await User.isExists(userId);
	if (!check) {
		throw new Error("User doesn't exist");
	}
	const result = await User.findOne({ userId }).select({
		orders: 0,
		totalPrice: 0,
		_id: 0,
	});

	if (result == null) {
		throw new Error("User does not exists");
	}

	return result;
};

const deleteSingleUserFromDB = async (userId: number) => {
	const check = await User.isExists(userId);
	if (!check) {
		throw new Error("User doesn't exist");
	}
	const result = await User.deleteOne({ userId });

	return result;
};
const updateSingleUserIntoDB = async (userId: number, userData: TUser) => {
	const check = await User.isExists(userId);
	if (!check) {
		throw new Error("User doesn't exist");
	}

	if (userData.password) {
		const hashedPass = await bcrypt.hash(
			userData.password,
			Number(config.salt_rounds)
		);
		userData.password = hashedPass;
	}
	const updatedUser = await User.updateOne({ userId }, { $set: userData });

	if (updatedUser.modifiedCount == 1) {
		const result = await User.find({ userId }).select({
			orders: 0,
			totalPrice: 0,
		});
		return result;
	}
};

const updateOrdersIntoDB = async (userId: number, userOrders: TOrder[]) => {
	const check = await User.isExists(userId);
	if (!check) {
		throw new Error("User doesn't exist");
	}
	const result = await User.updateOne(
		{ userId },
		{ $addToSet: { orders: { $each: [userOrders] } } }
	);
	return result;
};

const getOrdersFromDB = async (userId: number) => {
	const check = await User.isExists(userId);
	if (!check) {
		throw new Error("User doesn't exist");
	}

	const result = await User.findOne({ userId }).select({ orders: 1, _id: 0 });

	return result;
};
const getUserInfoFromDB = async (userId: number) => {
	const result = await User.findOne({ userId });

	return result;
};

const getTotalPriceFromDB = async (userId: number, userData: TUser) => {
	const check = await User.isExists(userId);
	if (!check) {
		throw new Error("User doesn't exist");
	}
	const userOrders: TOrder[] = userData.orders;

	let totalPrice = 0;
	if (userOrders.length > 0) {
	userOrders.forEach((order: TOrder) => {
		totalPrice = totalPrice + order.price * order.quantity;
	});
	const result = await User.findOneAndUpdate(
		{ userId },
		{ $set: { totalPrice: totalPrice } },
		{ new: true }
	).select({ totalPrice: 1, _id: 0 });
	return result;
	} else throw new Error("No orders available");
};

export const userService = {
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
