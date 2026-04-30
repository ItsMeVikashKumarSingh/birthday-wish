const sharp = require("sharp");

const setPic = async function (pic) {
  await sharp(pic)
    .resize(400, 400)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`src/pic.jpeg`);
  return console.log("IMAGE 1 processed successfully!!!");
};

const setPic2 = async function (pic) {
  await sharp(pic)
    .resize({ width: 1200, withoutEnlargement: true }) // Preserve aspect ratio, no cropping
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`src/pic2.jpeg`);
  return console.log("IMAGE 2 processed successfully!!!");
};

module.exports = { setPic, setPic2 };
