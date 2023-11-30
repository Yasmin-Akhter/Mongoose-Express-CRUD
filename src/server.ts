import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

async function main() {
	try {
		await mongoose.connect(config.database_url as string);

		app.listen(config.port, () => {
			console.log(`app is listening on port ${config.port}`);
		});
	} catch (err) {
		throw new Error("Something went wrong");
	}
}
main();
