var express = require('express');
var router = express.Router();
var db = require('./../db');


router.post('/register', function (req, res) {
    const {
        student_id,
        year,
        invoice_amount,
        pay_amount,
        status_register,
        desc
    } = req.body;
    let sql = "INSERT INTO tb_register (student_id, year, invoice_amount, pay_amount, status_register, desc) VALUES ?";
    let data = [[student_id, year, invoice_amount, pay_amount, status_register, desc]];
    db.query(sql, [data], function (err, result) {
        if (err) throw err;
        res.status(200).json({ message: 'tb_register added successfully' });
    });
});

router.get('/register', function (req, res) {
    let sql = "SELECT * FROM tb_register join tb_students on tb_register.student_id = tb_students.id";
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

router.get('/register/:id', function (req, res) {
    const id = req.params.id;
    let sql = "SELECT * FROM tb_register join tb_students on tb_register.student_id = tb_students.id WHERE tb_register.id = ?";
    db.query(sql, [id], function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

router.put('/register/:id', function (req, res) {
    const id = req.params.id;
    const {
        student_id,
        year,
        invoice_amount,
        pay_amount,
        status_register,
        desc
    } = req.body;
    let sql = "UPDATE tb_register SET student_id = ?, year = ?, invoice_amount = ?, pay_amount = ?, status_register = ?, desc = ? WHERE id = ?";
    db.query(sql, [student_id, year, invoice_amount, pay_amount, status_register, desc, id], function (err, result) {
        if (err) throw err;
        res.status(200).json({ message: 'tb_register updated successfully' });
    });
});

router.delete('/register/:id', function (req, res) {
    const id = req.params.id;
    let sql = "DELETE FROM tb_register WHERE id = ?";
    db.query(sql, [id], function (err, result) {
        if (err) throw err;
        res.status(200).json({ message: 'tb_register deleted successfully' });
    });
});

router.put('/status_register/:id', function (req, res) {
    const id = req.params.id;
    const {
        year,
        pay_amount,
        status_register,
        remark
    } = req.body;
    let sql = "UPDATE tb_students SET year = ?, pay_amount = ?, status_register = ?, remark = ? WHERE id = ?";
    db.query(sql, [ year, pay_amount, status_register, remark,id], function (err, result) {
        if (err) throw err;
        res.status(200).json({ message: 'updated successfully' });
    });
});
router.post('/search_student_by_class_name', function (req, res) {
    const  className  = req.body.class_name;
    console.log(className);
    let sql = " SELECT * FROM tb_students WHERE class_name like ?";
    db.query(sql, [className], function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});



module.exports = router;