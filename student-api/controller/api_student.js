var express = require("express");
var router = express.Router();
var db = require("./../db");
var moment = require("moment");

router.get("/student", function (req, res) {
  let sql = "SELECT * FROM tb_students";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

router.get("/student_count", function (req, res) {
  let sql = "SELECT COUNT(*) as count FROM tb_students";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});


router.post("/add_student", function (req, res) {
  const {
    student_id,
    first_name,
    last_name,
    date_of_birth,
    age,
    gender,
    level,
    class_name,
    address,
    parent,
    phone_parent,
    phone
  } = req.body;
  let sql = "INSERT INTO tb_students (first_name, last_name, date_of_birth, age, gender, level, class_name, address, parent, phone_parent, phone) VALUES ?";
  let data = [[
    first_name,
    last_name,
    date_of_birth,
    age,
    gender,
    level,
    class_name,
    address,
    parent,
    phone_parent,
    phone
  ]];
  db.query(sql, [data], function (err, result) {
    if (err) throw err;
    res.json({
      'status': 'success',
      'result': result
    });

  });
});


router.put("/update_student/:id", function (req, res) {
  const studentId = req.params.id;
  const {
    first_name,
    last_name,
    date_of_birth,
    age,
    gender,
    level,
    class_name,
    address,
    parent,
    phone_parent,
    phone
  } = req.body;
  let sql = `
  UPDATE tb_students
  SET first_name = ?, last_name = ?,date_of_birth = ?, age = ?, gender = ?, level = ?, class_name = ?, address = ?, parent = ?, phone_parent = ?, phone = ?
  WHERE id = ?
`;

  db.query(sql, [
    first_name,
    last_name,
    date_of_birth,
    age,
    gender,
    level,
    class_name,
    address,
    parent,
    phone_parent,
    phone,
    studentId
  ], function (err, result) {
    if (err) throw err;
    res.json({
      'status': 'success update',
      'result': result
    });
  });
});

router.delete("/delete_student/:id", function (req, res) {
  const studentId = req.params.id;

  let sql = "DELETE FROM tb_students WHERE id = ?";
  db.query(sql, [studentId], function (err, result) {
    if (err) throw err;
    res.json({
      'status': `success delete ${studentId}`,
      'result': result
    });
  });
});

module.exports = router;