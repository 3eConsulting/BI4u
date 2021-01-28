import AWS from "aws-sdk";
import config from "../../config";

const s3 = new AWS.S3({
	region: "sa-east-1",
	credentials: {
		accessKeyId: config.AWS.accessKey,
		secretAccessKey: config.AWS.secretKey,
	},
});

export default s3;
