const Jimp = require("jimp");
const path = require("path");

const resizedImage = (req, res) => {
  console.log(req.file);
  return Jimp.read(`${req.file.path}`)
    .then((lenna) => {
      console.log("reached jimp");
      return lenna
        .resize(720, Jimp.AUTO) // resize
        .quality(85)
        .writeAsync(`compressed-images/${req.file.filename}`);
      // TODO: upload images to aws s3
    })
    .catch((err) => {
      return err;
    });
};

module.exports = { resizedImage };
