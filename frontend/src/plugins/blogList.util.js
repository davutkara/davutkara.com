const util = require("util");
const fs = require("fs");

const readDir = util.promisify(fs.readdir);

async function main() {
  // find the paths
  const filePathsEn = await readDir(__dirname + "/../../public/docs/blog/en");
  const filePathsTr = await readDir(__dirname + "/../../public/docs/blog/tr");
  return [
    ...filePathsEn.map((p) => "en/" + p),
    ...filePathsTr.map((p) => "tr/" + p),
  ];
}
module.exports = main;
