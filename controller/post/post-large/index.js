const { upload } = require("../../../middleware/multer/index");
const { post } = require("../../../models/post/index");
const { uploadPost } = require("../../../dao/index");
const { postValidation } = require("../../../services/validation/index");
const { resizedImage } = require("../../../services/image-processing/index");
// const S3 = require("aws-sdk/clients/s3");
const { S3Client, S3 }= require("@aws-sdk/client-s3");

const { Upload } =require("@aws-sdk/lib-storage") ;



const fs = require("fs");
const path = require("path");



require("dotenv").config();
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accesskeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

// const s3 = new S3({
//   region: "us-east-2",
//   accessKeyId: "AKIAQMFVDOA5UADMCTAE",
//   secretAccessKey: "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",
// });

const uploadParallel = async (client, target)=>{
    const parallelUploads3 = new Upload({
        client:client,
        params:target,
    });
    
    // s3client.upload(target).promise().then(()=>{
    //     res.json("sfds")
    // })
    parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log("uploading document");
    });

   return  parallelUploads3.done();
    
}



const uploadLarge= (req, res) => {
 
          fs.readFile(req.file.path, function (err, data) {
            if (err) { throw err; }

            var base64data = new Buffer(data, 'binary');

            const target = {
                Bucket:bucketName,
                Body:base64data,
                Key:req.file.filename,
            };
        

            const client = new S3({
                region:region,
                accessKeyId:accesskeyId,
                secretAccessKey:secretAccessKey
                });

            uploadParallel(client, target).then((data)=>res.json(data)).catch(err=>res.json(err));
                
    
        });

};
module.exports = { uploadLarge };
