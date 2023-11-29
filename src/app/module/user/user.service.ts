import express from "express";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDb = async (userData: TUser) => {
	const result = await User.create(userData);
	return result;
};
const getAllUserFromDB = async () => {
	const result = await User.find().select({
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
		throw new Error("This user doesn't exist");
	}

	return result;
};
const deleteSingleUserFromDB = async (userId: number) => {
	const result = await User.updateOne({ userId }, { isDeleted: true });
	return result;
};

export const userService = {
	createUserIntoDb,
	getAllUserFromDB,
	getSingleUserFromDB,
	deleteSingleUserFromDB,
};
