const fs = require("fs");
const path = require("path");

const genIndex = function (markup) {
  let html = fs.readFileSync(path.join(__dirname, "../src/template.html"), {
    encoding: "utf-8",
  });

  let readTime = "",
    readVar = "";

  if (markup.length) {
    readTime = (markup.split(" ").length / 200) * 60;
    readVar = `<style>:root{
      --readTime: ${Math.round(readTime) + 15}s;
    }</style>`;
  }

  const formatEnv = (val) => (val || "").replace(/\\n/g, "\n");

  html = html
    .replace("{{^READ_TIME}}", readVar)
    .replace("{{^SCROLL_MSG}}", markup)
    .replace(
      "{{^HBD_MSG}}",
      formatEnv(process.env.HBD_MSG) || "Wish you a very Happy Birthday"
    )
    .replace(/\{\{\^NAME\}\}/g, formatEnv(process.env.NAME))
    .replace(/\{\{\^NICKNAME\}\}/g, formatEnv(process.env.NICKNAME || process.env.NAME))
    .replace(/\{\{\^SMALL_MSG\}\}/g, formatEnv(process.env.SMALL_MSG || ""))
    .replace(/\{\{\^WISHES\}\}/g, formatEnv(process.env.WISHES || ""))
    .replace(/\{\{\^WISHES_TITLE\}\}/g, formatEnv(process.env.WISHES_TITLE || "My Wishes for You"))
    .replace(/\{\{\^PIC_CAPTION\}\}/g, formatEnv(process.env.PIC_CAPTION || ""))
    .replace(/\{\{\^NASA_INTRO\}\}/g, formatEnv(process.env.NASA_INTRO || ""))
    .replace(/\{\{\^PIC2_CAPTION\}\}/g, formatEnv(process.env.PIC2_CAPTION || ""))
    .replace(/\{\{\^SENDER_NAME\}\}/g, process.env.SENDER_NAME || "With Love");

  fs.writeFileSync(path.join(__dirname, "../src/index.html"), html, {
    encoding: "utf-8",
  });
  console.log("Index Generated");
};

module.exports = genIndex;
