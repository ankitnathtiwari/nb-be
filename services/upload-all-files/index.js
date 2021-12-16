const AWS = require("aws-sdk");
const fs = require("fs");
const path = "/home/ubuntu/reporter/nb-be/compressed-images";

const S3 = require("aws-sdk/clients/s3");

const s3 = new S3({
  Bucket: "nb-post-image",
  region: "us-east-2",
});

const uploadToS3 = (filePath, fileName) => {
  const fileStream = fs.createReadStream(filePath);
  const uploadParams = {
    Bucket: "nb-post-image",
    Body: fileStream,
    Key: fileName,
  };
  return s3.upload(uploadParams).promise();
};

fs.readdir(path, (err, files) => {
  files.forEach((file) => {
    const filePath = `${path}/${file}`;
    uploadToS3(filePath, file);
  });
});
