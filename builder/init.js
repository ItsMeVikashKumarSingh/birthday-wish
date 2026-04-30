const axios = require("axios").default;
const path = require("path");
const fs = require("fs");
const { setPic, setPic2 } = require("./getPic");
const genIndex = require("./genIndex");
const {
  generateMarkupLocal,
  generateMarkupRemote,
} = require("./generateMarkup");

require("dotenv").config();

if (!process.env.NAME) throw new Error("Please specify NAME in environment.");
if (!process.env.PIC) throw new Error("Please specify PIC in environment.");

const picPath = process.env.PIC;
const msgPath = process.env.SCROLL_MSG;

//Local initialization
const setLocalData = async () => {
  try {
    const pic = path.join(__dirname, "../local/", picPath);
    const pic2Path = process.env.PIC2;
    let markup = "";
    if (msgPath) {
      const text = fs.readFileSync(path.join(__dirname, "../local/", msgPath), {
        encoding: "utf-8",
      });
      markup = generateMarkupLocal(text);
    }
    await setPic(pic);
    if (pic2Path) {
      const pic2 = path.join(__dirname, "../local/", pic2Path);
      await setPic2(pic2);
    }
    genIndex(markup);
  } catch (e) {
    throw new Error(`Local initialization failed: ${e.message}`);
  }
};

//Remote initialization
const setRemoteData = async () => {
  try {
    let res = await axios.get(picPath, {
      responseType: "arraybuffer",
    });
    const pic = res.data;
    let markup = "";
    if (msgPath) {
      const article = msgPath.split("/").pop();
      res = await axios.get(
        `https://api.telegra.ph/getPage/${article}?return_content=true`
      );
      const { content } = res.data.result;
      markup = content.reduce(
        (string, node) => string + generateMarkupRemote(node),
        ""
      );
    }
    await setPic(pic);
    genIndex(markup);
  } catch (e) {
    throw new Error(`Remote initialization failed: ${e.message}`);
  }
};

if (process.argv[2] === "--local") setLocalData();
else if (process.argv[2] === "--remote") setRemoteData();
else console.log("Fetch mode not specified.");
