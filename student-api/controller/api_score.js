var express = require("express");
var router = express.Router();
var db = require("./../db");
var moment = require("moment");
var app = express();

router.get("/score", function (req, res) {
    let sql = `SELECT
    s.id,
    s.first_name,
    s.last_name,
    s.class_name,
    sc.month,  
    sub.subject_id,
    MAX(CASE WHEN sub.subject_name = 'ຄະນິດສາດ' THEN sc.score ELSE 0 END) AS maths,
    MAX(CASE WHEN sub.subject_name = 'ຟິສິກສາດ' THEN sc.score ELSE 0 END) AS physics,
    MAX(CASE WHEN sub.subject_name = 'ເຄມີສາດ' THEN sc.score ELSE 0 END) AS chemistry,
    MAX(CASE WHEN sub.subject_name = 'ພາສາລາວ-ວັນນະຄະດີ' THEN sc.score ELSE 0 END) AS laolanguage,
    MAX(CASE WHEN sub.subject_name = 'ພູມສາດ' THEN sc.score ELSE 0 END) AS phoumsath,
    MAX(CASE WHEN sub.subject_name = 'ປະຫວັດສາດ' THEN sc.score ELSE 0 END) AS history,
    MAX(CASE WHEN sub.subject_name = 'ຊີວະສາດ' THEN sc.score ELSE 0 END) AS biology,
    MAX(CASE WHEN sub.subject_name = 'ສືກສາພົນລະເມືອງ' THEN sc.score ELSE 0 END) AS laostudy,
    MAX(CASE WHEN sub.subject_name = 'ອັງກິດ' THEN sc.score ELSE 0 END) AS english,

    (MAX(CASE WHEN sub.subject_name = 'ຄະນິດສາດ' THEN sc.score ELSE 0 END) +
    MAX(CASE WHEN sub.subject_name = 'ຟິສິກສາດ' THEN sc.score ELSE 0 END) +
    MAX(CASE WHEN sub.subject_name = 'ເຄມີສາດ' THEN sc.score ELSE 0 END) +
    MAX(CASE WHEN sub.subject_name = 'ພາສາລາວ-ວັນນະຄະດີ' THEN sc.score ELSE 0 END) +
    MAX(CASE WHEN sub.subject_name = 'ພູມສາດ' THEN sc.score ELSE 0 END) +
    MAX(CASE WHEN sub.subject_name = 'ປະຫວັດສາດ' THEN sc.score ELSE 0 END) +
    MAX(CASE WHEN sub.subject_name = 'ຊີວະສາດ' THEN sc.score ELSE 0 END) +
    MAX(CASE WHEN sub.subject_name = 'ສືກສາພົນລະເມືອງ' THEN sc.score ELSE 0 END) +
    MAX(CASE WHEN sub.subject_name = 'ອັງກິດ' THEN sc.score ELSE 0 END)) AS total_score
FROM
    tb_students s
JOIN
    tb_scores sc ON s.id = sc.student_id
JOIN
    tb_subjects sub ON sc.subject_id = sub.subject_id
GROUP BY
    s.id, s.first_name, s.last_name, s.class_name
    ORDER BY
    total_score DESC;;
`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});
router.post("/score_by_class_and_month", function (req, res) {
    const className = req.body.class_name;
    const month = req.body.month;
    console.log(className, month);

    let sql = `SELECT
  s.id,
  s.first_name,
  s.last_name,
  s.class_name,
  s.gender,
  sc.month,
  sub.subject_id,
  MAX(CASE WHEN sub.subject_name = 'ຄະນິດສາດ' THEN sc.score ELSE 0 END) AS maths,
  MAX(CASE WHEN sub.subject_name = 'ຟິສິກສາດ' THEN sc.score ELSE 0 END) AS physics,
  MAX(CASE WHEN sub.subject_name = 'ເຄມີສາດ' THEN sc.score ELSE 0 END) AS chemistry,
  MAX(CASE WHEN sub.subject_name = 'ພາສາລາວ-ວັນນະຄະດີ' THEN sc.score ELSE 0 END) AS laolanguage,
  MAX(CASE WHEN sub.subject_name = 'ພູມສາດ' THEN sc.score ELSE 0 END) AS phoumsath,
  MAX(CASE WHEN sub.subject_name = 'ປະຫວັດສາດ' THEN sc.score ELSE 0 END) AS history,
  MAX(CASE WHEN sub.subject_name = 'ຊີວະສາດ' THEN sc.score ELSE 0 END) AS biology,
  MAX(CASE WHEN sub.subject_name = 'ສືກສາພົນລະເມືອງ' THEN sc.score ELSE 0 END) AS laostudy,
  MAX(CASE WHEN sub.subject_name = 'ອັງກິດ' THEN sc.score ELSE 0 END) AS english,

  (MAX(CASE WHEN sub.subject_name = 'ຄະນິດສາດ' THEN sc.score ELSE 0 END) +
  MAX(CASE WHEN sub.subject_name = 'ຟິສິກສາດ' THEN sc.score ELSE 0 END) +
  MAX(CASE WHEN sub.subject_name = 'ເຄມີສາດ' THEN sc.score ELSE 0 END) +
  MAX(CASE WHEN sub.subject_name = 'ພາສາລາວ-ວັນນະຄະດີ' THEN sc.score ELSE 0 END) +
  MAX(CASE WHEN sub.subject_name = 'ພູມສາດ' THEN sc.score ELSE 0 END) +
  MAX(CASE WHEN sub.subject_name = 'ປະຫວັດສາດ' THEN sc.score ELSE 0 END) +
  MAX(CASE WHEN sub.subject_name = 'ຊີວະສາດ' THEN sc.score ELSE 0 END) +
  MAX(CASE WHEN sub.subject_name = 'ສືກສາພົນລະເມືອງ' THEN sc.score ELSE 0 END) +
  MAX(CASE WHEN sub.subject_name = 'ອັງກິດ' THEN sc.score ELSE 0 END)) AS total_score

FROM
  tb_students s
JOIN
  tb_scores sc ON s.id = sc.student_id
JOIN
  tb_subjects sub ON sc.subject_id = sub.subject_id
WHERE s.class_name LIKE ?
  AND sc.month = ?
GROUP BY
  s.id, s.first_name, s.last_name, s.class_name
  ORDER BY
    total_score DESC;;
`;
    db.query(sql, [className, month], function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});


router.post("/add_score", function (req, res) {
    try{
        const studentID = req.body.student_id;
    const subjectID = req.body.subject_id;
    const score = req.body.score;
    const month = req.body.month;

    let sql = `INSERT INTO tb_scores (student_id, subject_id, score, month) VALUES (?,?,?,?)`;
    db.query(sql, [studentID, subjectID, score, month], function (err, result) {
        if (err) throw err;
        res.json(result);
    });
    }catch(err){
        res.json('status: 400');
        console.log(err);
    }
});

router.post("/update_score", function (req, res) {
    const studentID = req.body.student_id;
    const subjectID = req.body.subject_id;
    const score = req.body.score;
    const month = req.body.month;

    let sql = `UPDATE tb_scores SET score = ? WHERE student_id = ? AND subject_id = ? AND month = ?`;
    db.query(sql, [score, studentID, subjectID, month], function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});


module.exports = router;