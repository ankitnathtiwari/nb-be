const Jimp = require("jimp");
const path = require("path");

const resizedImage = async (req, res) => {
  try {
    const lenna = await Jimp.read(`${req.file.path}`);
    const compressedImage = await lenna
      .resize(1080, Jimp.AUTO)
      .quality(85)
      .writeAsync(`compressed-images/${req.file.filename}`);
    return compressedImage;
  } catch (err) {
    return { err: true, message: "Image Too Large" };
  }
};

module.exports = { resizedImage };
