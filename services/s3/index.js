const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accesskeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region: region,
});


const uploadToS3 = (filePath, fileName) => {
  const fileStream = fs.createReadStream(filePath);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileName,
  };
  return s3.upload(uploadParams).promise();
};

module.exports = { uploadToS3 };
