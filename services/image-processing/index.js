const Jimp = require("jimp");
const path = require("path");

const resizedImage = (req) =>
  Jimp.read(`${req.file.path}`)
    .then((lenna) => {
      return (
        lenna
          .resize(720, Jimp.AUTO) // resize
          .quality(85)
          // TODO: upload images to aws s3
          .writeAsync(`compressed-images/${req.file.filename}`)
      );
    })
    .catch((err) => {
      return res.json("some error occured");
    });

module.exports = { resizedImage };
