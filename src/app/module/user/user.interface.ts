import { Model } from "mongoose";

export type TOrder = {
	productName: string;
	price: number;
	quantity: number;
};

export type TUser = {
	userId: number;
	username: string;
	password: string;
	fullName: {
		firstName: string;
		lastName: string;
	};
	age: number;
	email: string;
	isActive: boolean;
	hobbies: string[];
	address: {
		street: string;
		city: string;
		country: string;
	};
	orders: TOrder[];
	isDeleted: boolean;
};

// export type userMethods = {
// 	isExists(id: number): Promise<TUser | null>;
// };
export interface UserModel extends Model<TUser> {
	isExists(id: number): Promise<TUser | null>;
	
}
