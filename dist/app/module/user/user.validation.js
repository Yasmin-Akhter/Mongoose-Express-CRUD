"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidateSchema = zod_1.z
    .array(zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
}))
    .default([]);
const userValidateSchema = zod_1.z.object({
    userId: zod_1.z.number({ required_error: "Id is required" }),
    username: zod_1.z.string({ required_error: "user name is required" }),
    password: zod_1.z.string({ required_error: "password is required" }),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string({ required_error: "name is required" }),
        lastName: zod_1.z.string({ required_error: "name is required" }),
    }),
    age: zod_1.z.number({ required_error: "age is required" }),
    email: zod_1.z.string({ required_error: "email is required" }).email(),
    isActive: zod_1.z.boolean().default(true),
    hobbies: zod_1.z.array(zod_1.z.string()).default([]),
    address: zod_1.z.object({
        street: zod_1.z.string({ required_error: "Address is required" }),
        city: zod_1.z.string({ required_error: "Address is required" }),
        country: zod_1.z.string({ required_error: "Address is required" }),
    }),
    orders: orderValidateSchema,
    // totalPrice: z.number().optional().default(0),
});
exports.default = userValidateSchema;
