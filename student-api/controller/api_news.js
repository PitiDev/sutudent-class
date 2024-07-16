var express = require("express");
var router = express.Router();
var db = require("./../db");
var moment = require("moment");

router.get("/news", function (req, res) {
  let sql = "SELECT * FROM tb_news";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;