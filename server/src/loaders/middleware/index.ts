import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

export default async ({ app }: { app: express.Application }) => {
	// Coookie Parsing Middleware
	app.use(cookieParser());

	// Body Parsing Middleware for URL Encoded and JSON POST Requests
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// CORS middleware
	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);
};
