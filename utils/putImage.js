const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./s3Client");

exports.uploadImageToS3 = async (image, imageName) => {
	const params = {
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: `${imageName}`,
		Body: image,
		ContentType: "image/jpg,jpeg,png",
	}

	const command = new PutObjectCommand(params);
	const data = await s3Client.send(command);

    let imageUrl;
    if(data.$metadata.httpStatusCode === 200){
       imageUrl=`https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`
    }
    return imageUrl;
}
