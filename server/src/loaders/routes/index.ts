import express from "express";
import { User, UserRepository } from "../../database/models/User";
import { Logger } from "winston";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../../services/utilities/tokens";
import { Container } from "typedi";
import AuthenticationService from "../../services/authentication";
import UtilitiesService from "../../services/utilities";
import { ExtendedUser } from "../../interfaces/authentication";

export default ({ app }: { app: express.Application }) => {
	const loggerInstance = Container.get("logger") as Logger;
	const authInstance = Container.get(AuthenticationService);
	const utilitiesInstance = Container.get(UtilitiesService);
	const userRepository = Container.get(UserRepository);

	// Base Server Status StandAlone Routes
	app.get("/status", (_, res) => res.status(200).end(`We're Up & Running`));
	app.head("/status", (_, res) => res.status(200).end(`We're Up & Running`));

	// Check if User is logged In
	app.post("/is-authenticated", async (req: express.Request, res: express.Response) => {
		let payload: any = null;

		try {
			const refreshToken = req.cookies.rtid;
			payload = verifyRefreshToken(refreshToken);
		} catch (err) {
			res.cookie("rtid", "");
			res.status(401).json({
				authenticated: false,
			});
		}

		if (Date.now() * 1000 >= payload.exp) {
			res.cookie("rtid", "");
			return res.status(401).json({
				authenticated: false,
			});
		}

		return res.status(200).json({
			authenticated: true,
		});
	});

	// Refresh Session StandAlone Route
	app.post("/refresh-session", async (req: express.Request, res: express.Response) => {
		const refreshToken: string = req.cookies.rtid;

		let payload: any = null;

		try {
			payload = verifyRefreshToken(refreshToken);
		} catch (err) {
			loggerInstance.error(`Invalid Refresh Token. ${err}`);
			return res
				.json({
					status: "FAILED",
				})
				.status(401)
				.end();
		}

		let user = await User.findOne({ username: payload.username }, {});

		if (!user) {
			loggerInstance.error("Could not refresh session. Did not reckognize user.");
			return res
				.json({
					status: "FAILED",
				})
				.status(401)
				.end();
		}

		if (payload.tokenVersion !== user.tokenVersion) {
			loggerInstance.error("Could not refresh session. Invalidated Session.");
			return res
				.json({
					status: "FAILED",
				})
				.status(401)
				.end();
		}

		res.cookie("rtid", createRefreshToken(user));

		return res.status(200).send({
			status: "LOGGEDIN",
			accessToken: createAccessToken(user),
			user: {
				username: user.username,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				role: user.role,
			},
		});
	});

	// Logout Session StandAlone Route
	app.post("/logout", async (req: express.Request, res: express.Response) => {
		res.cookie("rtid", "", { maxAge: 0 });
		res.status(200).end();
	});

	// LogIn Session StandAlone Route
	app.post("/login", async (req: express.Request, res: express.Response) => {
		loggerInstance.silly("Got LogIn Request");
		// Fetch User from Database and Authenticate
		let { username, password } = req.body;

		let extendedUser: ExtendedUser;

		try {
			extendedUser = await authInstance.logIn(username, password);
		} catch (err) {
			return res.status(500).send({
				error: err,
			});
		}

		// Deestructure user from generated tokens
		let { refreshToken } = extendedUser;

		// set refreshToken to cookies
		res.cookie("rtid", refreshToken, { httpOnly: true });

		return res.status(200).send({
			accessToken: extendedUser.accessToken,
			user: {
				username: extendedUser.user.username,
				email: extendedUser.user.email,
				firstName: extendedUser.user.firstName,
				lastName: extendedUser.user.lastName,
				role: extendedUser.user.role,
			},
		});
	});
};
