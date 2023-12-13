"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidateSchema = zod_1.z
    .array(zod_1.z.object({
    productName: zod_1.z.string({
        invalid_type_error: "product name must be string",
    }),
    price: zod_1.z.number({ invalid_type_error: "price must be number" }),
    quantity: zod_1.z.number({ invalid_type_error: "quantity must be number" }),
}))
    .default([]);
const userValidateSchema = zod_1.z.object({
    userId: zod_1.z.number({
        required_error: "Id is required",
        invalid_type_error: "Id must be number",
    }),
    username: zod_1.z.string({
        required_error: "user name is required",
        invalid_type_error: "User name must be string",
    }),
    password: zod_1.z.string({ required_error: "password is required" }),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string({
            required_error: "first name is required",
            invalid_type_error: " first name must be string",
        }),
        lastName: zod_1.z.string({
            required_error: "name is required",
            invalid_type_error: " last name must be string",
        }),
    }),
    age: zod_1.z.number({
        required_error: "age is required",
        invalid_type_error: "age must be number",
    }),
    email: zod_1.z
        .string({
        required_error: "email is required",
    })
        .email(),
    isActive: zod_1.z.boolean().default(true),
    hobbies: zod_1.z.array(zod_1.z.string()).default([]),
    address: zod_1.z.object({
        street: zod_1.z.string({
            required_error: "Address is required",
            invalid_type_error: "street must be string",
        }),
        city: zod_1.z.string({
            required_error: "Address is required",
            invalid_type_error: "city must be string",
        }),
        country: zod_1.z.string({
            required_error: "Address is required",
            invalid_type_error: "country must be string",
        }),
    }),
    orders: orderValidateSchema,
    totalPrice: zod_1.z.number().optional(),
});
exports.default = userValidateSchema;
