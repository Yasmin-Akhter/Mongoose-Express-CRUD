import { z } from "zod";
const orderValidateSchema = z
	.array(
		z.object({
			productName: z.string(),
			price: z.number(),
			quantity: z.number(),
		})
	)
	.default([]);

const userValidateSchema = z.object({
	userId: z.number({ required_error: "Id is required" }),
	username: z.string({ required_error: "user name is required" }),
	password: z.string({ required_error: "password is required" }),
	fullName: z.object({
		firstName: z.string({ required_error: "name is required" }),
		lastName: z.string({ required_error: "name is required" }),
	}),
	age: z.number({ required_error: "age is required" }),
	email: z.string({ required_error: "email is required" }).email(),
	isActive: z.boolean().default(true),
	hobbies: z.array(z.string()).default([]),
	address: z.object({
		street: z.string({ required_error: "Address is required" }),
		city: z.string({ required_error: "Address is required" }),
		country: z.string({ required_error: "Address is required" }),
	}),
	orders: orderValidateSchema,
	totalPrice: z.number().optional().default(0),
});

export default userValidateSchema;
