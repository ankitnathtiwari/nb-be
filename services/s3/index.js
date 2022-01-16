const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();
const fs = require("fs");

const region = process.env.AWS_BUCKET_REGION;

const s3 = new S3({
  region: region,
});

const uploadToS3 = (filePath, fileName, bucketName) => {
  const fileStream = fs.createReadStream(filePath);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileName,
  };
  return s3.upload(uploadParams).promise();
};

const copyToAnotherBucket = async (destinationBucket, sourceBucket, key) => {
  var params = {
    Bucket: destinationBucket,
    CopySource: `/${sourceBucket}/${key}`,
    Key: key,
  };
  return await new Promise((resolve, reject) => {
    s3.copyObject(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const deleteFromS3Bucket = async (sourceBucket, key) => {
  var params = {
    Bucket: sourceBucket,
    Key: key,
  };
  return await new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

module.exports = { uploadToS3, copyToAnotherBucket, deleteFromS3Bucket };
