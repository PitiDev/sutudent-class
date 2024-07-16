var express = require("express");
var router = express.Router();
var db = require("./../db");
var moment = require("moment");
var app = express();


router.get("/class", function (req, res) {
  let sql = "SELECT * FROM tb_class";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

router.get("/class_count", function (req, res) {
  let sql = "SELECT COUNT(*) as count FROM tb_class";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/add_class", function (req, res) {
  const {
    level_class,
    name,
    teacher_name
  } = req.body;
  let sql = "INSERT INTO tb_class (level_class,name,teacher_name) VALUES ?";
  let data = [[level_class, name, teacher_name]];
  db.query(sql, [data], function (err, result) {
    if (err) throw err;
    res.status(200).json({ message: 'Class added successfully' });

  });
});

router.put('/update_class/:id', (req, res) => {
  const classId = req.params.id;
  const {
    level_class,
    name,
    teacher_name
  } = req.body;
  const query = `
      UPDATE tb_class
      SET level_class = ?, name = ?, teacher_name = ?
      WHERE id = ?
  `;
  db.query(query, [
    level_class,
    name,
    teacher_name,
    classId
  ], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update class' });
      return;
    }
    res.status(200).json({ message: 'Class updated successfully' });
  });
});


router.delete('/delete_class/:id', (req, res) => {
  const classId = req.params.id;

  const query = 'DELETE FROM tb_class WHERE id = ?';

  db.query(query, [classId], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete class' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }

    res.status(200).json({ message: 'Class deleted successfully' });
  });
});



module.exports = router;