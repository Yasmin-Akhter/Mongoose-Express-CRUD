import express from "express";
import { TOrder, TUser } from "./user.interface";
import { User } from "./user.model";
import { any, object } from "zod";

const createUserIntoDb = async (userData: TUser) => {
	if (await User.isExists(userData.userId)) {
		throw new Error("User already exists");
	}
	const result = await User.create(userData);
	return result;
};
const getAllUserFromDB = async () => {
	const result = await User.find({}).select({
		userId: 1,
		username: 1,
		fullName: 1,
		age: 1,
		email: 1,
		address: 1,
	});

	return result;
};
const getSingleUserFromDB = async (userId: number) => {
	const result = await User.findOne({ userId }).select({
		username: 1,
		fullName: 1,
		age: 1,
		email: 1,
		address: 1,
	});

	if (result == null) {
		throw new Error("User does not exists");
	}

	return result;
};

const deleteSingleUserFromDB = async (userId: number) => {
	const result = await User.deleteOne({ userId });
	if (result.deletedCount == 0) {
		throw new Error("User does not exists");
	}

	return result;
};
const updateSingleUserIntoDB = async (userId: number, userData: TUser) => {
	const result = await User.updateOne({ userId }, { $set: userData });
	return result;
};
const updateOrdersIntoDB = async (userId: number, userOrders: TOrder[]) => {
	const result = await User.updateOne(
		{ userId },
		{ $push: { orders: { $each: userOrders } } }
	);
	return result;
};

const getOrdersFromDB = async (userId: number) => {
	const result = await User.findOne({ userId }).select({ orders: 1 });
	if (result == null) {
		throw new Error("User does not exists");
	}

	return result;
};
const getUserInfoFromDB = async (userId: number) => {
	const result = await User.findOne({ userId });

	if (result == null) {
		throw new Error("User does not exists");
	}

	return result;
};

const getTotalPriceFromDB = async (userId: number, userData: TUser) => {
	const userOrders: TOrder[] = userData.orders;
	let totalPrice = 0;
	userOrders.forEach((order: TOrder) => {
		totalPrice = totalPrice + order.price * order.quantity;
	});

	const result = await User.findOneAndUpdate(
		{ userId },
		{ $set: { totalPrice: totalPrice } },
		{ new: true }
	).select({ totalPrice: 1 });
	return result;
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
