// const pino = require("pino");
// const fs = require("fs");

// function getCurrentDate() {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, "0");
//   const day = String(now.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// }

// const streams = [
//   {
//     level: "info", // log INFO and above
//     stream: fs.createWriteStream(`logs/log-${getCurrentDate()}.log`, {
//       flags: "a",
//     }),
//   },
//   {
//     level: "error", // log INFO and above
//     stream: fs.createWriteStream(`logs/log-${getCurrentDate()}.log`, {
//       flags: "a",
//     }),
//   },
// ];

// module.exports = pino(
//   {
//     level: "info",
//   },
//   pino.multistream(streams)
// );
