import express, { Request, Response } from "express";
import userValidateSchema from "./user.validation";
import { userService } from "./user.service";
import { ParseStatus } from "zod";

const createUser = async (req: Request, res: Response) => {
	try {
		const userData = req.body;
		const zodParsedData = userValidateSchema.parse(userData);
		const result = await userService.createUserIntoDb(zodParsedData);
		res.status(200).json({
			success: true,
			message: "User Created successfully",
			data: result,
		});
	} catch (err: any) {
		console.log(err);
		res.status(404),
			res.send({
				success: false,
				message: "Something went wrong",
				error: {
					status: 404,
					description: err.message || "Can't create new user",
				},
			});
	}
};
const getAllUser = async (req: Request, res: Response) => {
	try {
		const result = await userService.getAllUserFromDB();
		res.status(200).json({
			success: true,
			message: "Users fetched successfully",
			data: result,
		});
	} catch (err: any) {
		res.send({
			success: false,
			message: "No User found",
			error: {
				status: 404,
				description: "User not found",
			},
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
		res.status(404),
			res.send({
				success: false,
				message: err.message || "User not found",
				error: {
					status: 404,
					description: "User not found",
				},
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
			data: null,
		});
	} catch (err: any) {
		res.status(404),
			res.send({
				success: false,
				message: err.message || "User not found",
				error: {
					status: 404,
					description: "User not found",
				},
			});
	}
};
const updateSingleUser = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.userId, 10);
		const userData = req.body;
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
		res.status(404),
			res.send({
				success: false,
				message: err.message || "User not found",
				error: {
					status: 404,
					description: "User not found",
				},
			});
	}
};
const updateOrders = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.userId, 10);
		const userData = req.body;
		const result = await userService.updateOrdersIntoDB(userId, userData);
		res.status(200).json({
			success: true,
			message: "Order updated successfully",
			data: null,
		});
	} catch (err: any) {
		res.send({
			success: false,
			message: err.message || "Something went wrong",
			error: {
				status: 404,
				description: "Order updating process failed",
			},
		});
	}
};
const getOrders = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.userId, 10);
		const result = await userService.getOrdersFromDB(userId);
		res.status(200).json({
			success: true,
			message: "Order fetched successfully",
			data: result,
		});
	} catch (err: any) {
		res.status(404),
			res.send({
				success: false,
				message: err.message || "orders not found",
				error: {
					status: 404,
					description: "orders not found",
				},
			});
	}
};
const getTotalPrice = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.userId, 10);
		const userData = await userService.getUserInfoFromDB(userId);
		if (userData) {
			const result = await userService.getTotalPriceFromDB(userId, userData);
			res.status(200).json({
				success: true,
				message: "total price calculated successfully",
				data: result,
			});
		}
	} catch (err: any) {
		res.status(404),
			res.send({
				success: false,
				message: err.message || "Something went wrong",
				error: {
					status: 404,
					description: "Total price calculation failed",
				},
			});
	}
};

export const userController = {
	createUser,
	getAllUser,
	getSingleUser,
	deleteSingleUser,
	updateSingleUser,
	updateOrders,
	getOrders,
	getTotalPrice,
};
