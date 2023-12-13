import { z } from "zod";
const orderValidateSchema = z
	.array(
		z.object({
			productName: z.string({
				invalid_type_error: "product name must be string",
			}),
			price: z.number({ invalid_type_error: "price must be number" }),
			quantity: z.number({ invalid_type_error: "quantity must be number" }),
		})
	)
	.default([]);

const userValidateSchema = z.object({
	userId: z.number({
		required_error: "Id is required",
		invalid_type_error: "Id must be number",
	}),
	username: z.string({
		required_error: "user name is required",
		invalid_type_error: "User name must be string",
	}),
	password: z.string({ required_error: "password is required" }),
	fullName: z.object({
		firstName: z.string({
			required_error: "first name is required",
			invalid_type_error: " first name must be string",
		}),
		lastName: z.string({
			required_error: "name is required",
			invalid_type_error: " last name must be string",
		}),
	}),
	age: z.number({
		required_error: "age is required",
		invalid_type_error: "age must be number",
	}),
	email: z
		.string({
			required_error: "email is required",
		})
		.email(),
	isActive: z.boolean().default(true),
	hobbies: z.array(z.string()).default([]),
	address: z.object({
		street: z.string({
			required_error: "Address is required",
			invalid_type_error: "street must be string",
		}),
		city: z.string({
			required_error: "Address is required",
			invalid_type_error: "city must be string",
		}),
		country: z.string({
			required_error: "Address is required",
			invalid_type_error: "country must be string",
		}),
	}),
	orders: orderValidateSchema,
	totalPrice: z.number().optional(),
});

export default userValidateSchema;
