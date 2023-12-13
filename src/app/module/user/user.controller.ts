import express, { Request, Response } from "express";
import userValidateSchema from "./user.validation";
import { userService } from "./user.service";
import { ParseStatus, string } from "zod";
import { TUser } from "./user.interface";

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
		let errorMessage = "something went wrong";

		if (
			err.issues &&
			Array.isArray(err.issues) &&
			err.issues.length > 0 &&
			err.issues[0].message
		) {
			errorMessage = err.issues[0].message;
		} else if (err.message) {
			errorMessage = err.message;
		}

		res.status(404),
			res.send({
				success: false,
				message: "Can't create new user",
				error: {
					status: 404,
					description: errorMessage,
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
		let errorMessage = "something went wrong";

		if (
			err.issues &&
			Array.isArray(err.issues) &&
			err.issues.length > 0 &&
			err.issues[0].message
		) {
			errorMessage = err.issues[0].message;
		} else if (err.message) {
			errorMessage = err.message;
		}
		res.send({
			success: false,
			message: "No User found",
			error: {
				status: 404,
				description: errorMessage,
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
		let errorMessage = "something went wrong";

		if (
			err.issues &&
			Array.isArray(err.issues) &&
			err.issues.length > 0 &&
			err.issues[0].message
		) {
			errorMessage = err.issues[0].message;
		} else if (err.message) {
			errorMessage = err.message;
		}
		res.send({
			success: false,
			message: "No User found",
			error: {
				status: 404,
				description: errorMessage,
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
		let errorMessage = "something went wrong";

		if (
			err.issues &&
			Array.isArray(err.issues) &&
			err.issues.length > 0 &&
			err.issues[0].message
		) {
			errorMessage = err.issues[0].message;
		} else if (err.message) {
			errorMessage = err.message;
		}
		res.send({
			success: false,
			message: "User not found",
			error: {
				status: 404,
				description: errorMessage,
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
		let errorMessage = "something went wrong";

		if (
			err.issues &&
			Array.isArray(err.issues) &&
			err.issues.length > 0 &&
			err.issues[0].message
		) {
			errorMessage = err.issues[0].message;
		} else if (err.message) {
			errorMessage = err.message;
		}
		res.send({
			success: false,
			message: "No User found",
			error: {
				status: 404,
				description: errorMessage,
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
		let errorMessage = "something went wrong";

		if (
			err.issues &&
			Array.isArray(err.issues) &&
			err.issues.length > 0 &&
			err.issues[0].message
		) {
			errorMessage = err.issues[0].message;
		} else if (err.message) {
			errorMessage = err.message;
		}
		res.send({
			success: false,
			message: "Order updating process failed",
			error: {
				status: 404,
				description: errorMessage,
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
		let errorMessage = "something went wrong";

		if (
			err.issues &&
			Array.isArray(err.issues) &&
			err.issues.length > 0 &&
			err.issues[0].message
		) {
			errorMessage = err.issues[0].message;
		} else if (err.message) {
			errorMessage = err.message;
		}
		res.send({
			success: false,
			message: "Orders not found",
			error: {
				status: 404,
				description: errorMessage,
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
		} else throw new Error("user not found");
	} catch (err: any) {
		let errorMessage = "something went wrong";

		if (
			err.issues &&
			Array.isArray(err.issues) &&
			err.issues.length > 0 &&
			err.issues[0].message
		) {
			errorMessage = err.issues[0].message;
		} else if (err.message) {
			errorMessage = err.message;
		}
		res.send({
			success: false,
			message: "Total price calculating failed",
			error: {
				status: 404,
				description: errorMessage,
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
