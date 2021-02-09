import { Inject, Service } from "typedi";
import { Logger } from "winston";
import { createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken } from "./tokens";
import { User } from "../../database/models/User";
import stream from "stream";

export type S3UploadStream = {
	writeStream: stream.PassThrough;
	promise: Promise<AWS.S3.ManagedUpload.SendData>;
};

@Service()
export default class UtilitiesService {
	constructor(
		@Inject("logger") private readonly logger: Logger,
		@Inject("s3") private s3: AWS.S3,
		@Inject("s3Bucket") private s3Bucket: string
	) {}

	public async generateToken(variant: "accessToken" | "refreshToken", user: User) {
		this.logger.debug("generateToken method of UtilitiesService called");
		switch (variant) {
			case "accessToken":
				this.logger.silly(`generating a new access token for user: ${user}`);
				return createAccessToken(user);
			case "refreshToken":
				this.logger.silly(`generating a new refresh token with payload: ${user}`);
				return createRefreshToken(user);
		}
	}

	public async verifyToken(variant: "accessToken" | "refreshToken", token: string) {
		this.logger.debug("verifyToken method of UtilitiesService called");
		switch (variant) {
			case "accessToken":
				this.logger.silly(`verifying accessToken: ${token}`);
				return verifyAccessToken(token);
			case "refreshToken":
				this.logger.silly(`verifying refreshToken: ${token}`);
				return verifyRefreshToken(token);
		}
	}

	public getS3SignedURL(operation: "putObject", key: string) {
		var params = {
			Bucket: this.s3Bucket,
			Key: key,
			Expires: 15 * 60,
		};

		return this.s3.getSignedUrl(operation, params);
	}
}
