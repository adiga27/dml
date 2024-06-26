const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./s3Client");

exports.deleteS3Image = async(key) => {
	const params = {
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: key,
	}

	const command = new DeleteObjectCommand(params);
	const data = await s3Client.send(command);
	return data;
}