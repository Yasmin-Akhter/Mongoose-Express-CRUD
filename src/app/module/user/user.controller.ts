import express, { Request, Response } from "express";
import userValidateSchema from "./user.validation";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
	try {
		const { user: userData } = req.body;
		const zodParsedData = userValidateSchema.parse(userData);
		const result = await userService.createUserIntoDb(zodParsedData);
		res.status(200).json({
			success: true,
			message: "User Created successfully",
			data: result,
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message || "User creation failed",
			data: err,
		});
	}
};
const getAllUser = async (req: Request, res: Response) => {
	try {
		const result = await userService.getAllUserFromDB();
		res.status(200).json({
			success: true,
			message: "Users retrieved successfully",
			data: result,
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message || "User retrieved failed",
		});
	}
};
const getSingleUser = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.userId, 10);
		const result = await userService.getSingleUserFromDB(userId);
		res.status(200).json({
			success: true,
			message: "Users fetched successfully",
			data: result,
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message || "User not found",
		});
	}
};
const deleteSingleUser = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.userId, 10);
		const result = await userService.deleteSingleUserFromDB(userId);
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
			data: result,
		});
	} catch (err: any) {
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
};
const updateSingleUser = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.userId, 10);
		const { user: userData } = req.body;
		const zodParsedData = userValidateSchema.parse(userData);
		const result = await userService.updateSingleUserIntoDB(
			userId,
			zodParsedData
		);
		res.status(200).json({
			success: true,
			message: "User updated successfully",
			data: result,
		});
	} catch (err: any) {
		throw {
			success: false,
			message: "User not found",
			err: {
				code: 404,
				description: "User not Found",
			},
		};
	}
};
export const userController = {
	createUser,
	getAllUser,
	getSingleUser,
	deleteSingleUser,
	updateSingleUser,
};
