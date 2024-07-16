var express = require("express");
var router = express.Router();
var db = require("./../db");
var moment = require("moment");


router.get("/me", function (req, res) {
  let sql = "SELECT * FROM tb_users";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json({
      'status' : 'success',
      'token' : 'exaxsfsfefadc'
  });
  });
});

router.get("/user/get_user/", function (req, res) {
  let sql = "SELECT * FROM tb_users";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/user/register/", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  let sql = "INSERT INTO tb_users (username, password, role) VALUES ?";
  let data = [[username, password, role]];

  db.query(sql, [data], function (err, result) {
    if (err) throw err;
    res.json({
      status: "success",
      dataRes: result,
    });
  });
});

router.delete("/user/delete_user/:id", function (req, res) {
  const id = req.params.id;
  let sql = "DELETE FROM tb_users WHERE id = ?";
  db.query(sql, [id], function (err, result) {
    if (err) throw err;
    res.json({
      status: "success",
      dataRes: result,
    });
  });
});


module.exports = router;
