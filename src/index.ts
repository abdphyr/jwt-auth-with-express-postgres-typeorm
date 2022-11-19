import * as express from "express";
import { initDataSource } from "./database";
import { publicRoutes, protectedRoutes } from "./routes";

function main() {
	initDataSource();
	const app = express();
	app.use(express.json());
	app.use(publicRoutes);
	app.use(protectedRoutes);
	const PORT = process.env.PORT || 4000;
	app.listen(PORT, () => {
		console.log("Server running at PORT", PORT);
	})
}

main();
