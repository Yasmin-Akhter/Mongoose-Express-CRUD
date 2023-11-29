import { z } from "zod";

const userValidateSchema = z.object({
	userId: z.number(),
	username: z.string(),
	password: z.string(),
	fullName: z.object({
		firstName: z.string(),
		lastName: z.string(),
	}),
	age: z.number(),
	email: z.string().email(),
	isActive: z.boolean().default(true),
	hobbies: z.array(z.string()).default([]),
	address: z.object({
		street: z.string(),
		city: z.string(),
		country: z.string(),
	}),
	orders: z
		.array(
			z.object({
				productName: z.string(),
				price: z.number(),
				quantity: z.number(),
			})
		)
		.default([]),
	isDeleted: z.boolean().default(false),
});

export default userValidateSchema;
