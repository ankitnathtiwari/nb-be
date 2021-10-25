const { Upload } =require("@aws-sdk/lib-storage") ;
const {S3Client, S3}= require('@aws-sdk/client-s3');

const target = { Bucket, Key, Body };
try {
  const parallelUploads3 = new Upload({
    client: new S3({}) || new S3Client({}),queueSize: 4, partSize: "5MB", 
    leavePartsOnError: false, 
    params: target,
  });

  parallelUploads3.on("httpUploadProgress", (progress) => {
    console.log(progress);
  });

  await parallelUploads3.done();
} catch (e) {
  console.log(e);
}


fs.readFile(+ '/' + filename, function (err, data) {
    if (err) { throw err; }
    var d = new Date();
    var bucketLocation = d.getFullYear() + '/' +
        (d.getMonth() > 8 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)) +
        '/' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) + '/' + filename;
    var base64data = new Buffer(data, 'binary');

    console.log(base64data, "base64data is being uploaded");

    s3.putObject({
        Bucket: utils.config.apkBucket.bucket,
        Key: bucketLocation,
        Body: base64data
    }, function (err, res) {
        console.log(err, res);
        if (err) {
            console.log(err, "error block called");
            next(err, null)
        }
        else {
            next(null, bucketLocation);
        }
    });
});