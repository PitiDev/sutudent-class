var express = require("express");
var router = express.Router();
var db = require("../db");
var moment = require("moment");
var app = express();

router.post("/get_absent", function (req, res) {
    const className = req.body.class_name;
    let sql = "SELECT  tb_students.id, tb_absent.student_id, tb_students.first_name, tb_students.last_name, tb_absent.status, tb_absent.day, tb_absent.description FROM tb_absent join tb_students on tb_absent.student_id = tb_students.id WHERE tb_students.class_name like ?";
    db.query(sql, [className], function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

router.post("/get_absent_group_by_student", function (req, res) {
    const className = req.body.class_name;
    let sql = `
        SELECT 
            tb_students.id AS student_id, 
            tb_students.first_name, 
            tb_students.last_name,
            tb_absent.status,
            COUNT(tb_absent.student_id) AS absent_count
        FROM tb_absent 
        JOIN tb_students ON tb_absent.student_id = tb_students.id
        WHERE tb_students.class_name LIKE ?
        AND tb_absent.status = 'absent'
        GROUP BY tb_students.id, tb_students.first_name, tb_students.last_name
    `;
    db.query(sql, [className], function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

router.post("/get_late_group_by_student", function (req, res) {
    const className = req.body.class_name;
    let sql = `
        SELECT 
            tb_students.id AS student_id, 
            tb_students.first_name, 
            tb_students.last_name,
            tb_absent.status,
            COUNT(tb_absent.student_id) AS absent_count
        FROM tb_absent 
        JOIN tb_students ON tb_absent.student_id = tb_students.id
        WHERE tb_students.class_name LIKE ?
        AND tb_absent.status = 'late'
        GROUP BY tb_students.id, tb_students.first_name, tb_students.last_name
    `;
    db.query(sql, [className], function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

router.post("/get_sick_group_by_student", function (req, res) {
    const className = req.body.class_name;
    let sql = `
        SELECT 
            tb_students.id AS student_id, 
            tb_students.first_name, 
            tb_students.last_name,
            tb_absent.status,
            COUNT(tb_absent.student_id) AS absent_count
        FROM tb_absent 
        JOIN tb_students ON tb_absent.student_id = tb_students.id
        WHERE tb_students.class_name LIKE ?
        AND tb_absent.status = 'sick'
        GROUP BY tb_students.id, tb_students.first_name, tb_students.last_name
    `;
    db.query(sql, [className], function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

router.get("/absent_count", function (req, res) {
    let sql = "SELECT COUNT(*) as count FROM tb_absent join tb_students on tb_absent.student_id = tb_students.id";
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});


router.post('/add_absent', (req, res) => {

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayName = days[new Date().getDay()];

    console.log(days[new Date().getDay()]);

    const {
        student_id,
        status,
        desc
    } = req.body;
    let sql = "INSERT INTO tb_absent (student_id, status, day, description) VALUES ?";
    let data = [[student_id, status, dayName, desc]];
    db.query(sql, [data], function (err, result) {
        if (err) throw err;
        res.status(200).json({ message: 'tb_absent added successfully' });
    });
});

router.put('/update_absent/:id', function (req, res) {
    const id = req.params.id;
    const {
        student_id,
        status,
        day,
        desc
    } = req.body;
    let sql = "UPDATE tb_absent SET student_id = ?, status = ?, day = ?, desc = ? WHERE id = ?";
    db.query(sql, [student_id, status, day, desc, id], function (err, result) {
        if (err) throw err;
        res.status(200).json({ message: 'tb_absent updated successfully' });
    });
});


router.delete('/delete_absent/:id', function (req, res) {
    const id = req.params.id;
    let sql = "DELETE FROM tb_absent WHERE id = ?";
    db.query(sql, [id], function (err, result) {
        if (err) throw err;
        res.status(200).json({ message: 'tb_absent deleted successfully' });
    });
});




module.exports = router;