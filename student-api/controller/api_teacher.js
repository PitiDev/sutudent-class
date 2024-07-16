var express = require("express");
var router = express.Router();
var db = require("./../db");
var moment = require("moment");

router.get("/teacher", function (req, res) {
    let sql = "SELECT * FROM tb_teacher";
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);  
    });
});

router.get("/teacher_count", function (req, res) {
    let sql = "SELECT COUNT(*) as count FROM tb_teacher";
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

router.post('/add_teacher', (req, res) => {
    const {
        first_name,
        last_name,
        age,
        gender,
        level,
        class_room,
        position,
        address,
        phone
    } = req.body;

    const query = `
      INSERT INTO tb_teacher (first_name, last_name, age, gender, level,class_room, position, address, phone
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(query, [
        first_name,
        last_name,
        age,
        gender,
        level,
        class_room,
        position,
        address,
        phone
    ], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Failed to add teacher' });
            return;
        }

        res.status(201).json({ status: 'Teacher added successfully', teacherId: result.insertId });
    });
});

router.delete('/delete_teacher/:id', (req, res) => {
    const teacherId = req.params.id;

    const query = 'DELETE FROM tb_teacher WHERE tc_id = ?';

    db.query(query, [teacherId], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            res.status(500).json({ error: 'Failed to delete teacher' });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Teacher not found' });
            return;
        }

        res.status(200).json({ message: 'Teacher deleted successfully' });
    });
});

router.put('/update_teacher/:id', (req, res) => {
    const teacherId = req.params.id;
    const {
        first_name,
        last_name,
        age,
        gender,
        level,
        class_room,
        position,
        address,
        phone
    } = req.body;

    const query = `
      UPDATE tb_teacher
      SET first_name = ?, last_name = ?, age = ?, gender = ?, level = ?,class_room = ?, position = ?, address = ?, phone = ?
      WHERE tc_id = ?
  `;

    db.query(query, [
        first_name,
        last_name,
        age,
        gender,
        level,
        class_room,
        position,
        address,
        phone,
        teacherId
    ], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: 'Failed to update teacher' });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Teacher not found' });
            return;
        }

        res.status(200).json({ message: 'Teacher updated successfully' });
    });
});

router.get('/schedules', (req, res) => {
    const className = req.body.class_name;
    const sql = `SELECT 
    s.class_name,
    s.day_of_week,
    GROUP_CONCAT(CASE 
        WHEN s.start_time = '08:00:00' AND s.end_time = '09:00:00' THEN CONCAT(s.schedule_id, ', ', t.first_name, ', ', t.last_name, ', ', sj.subject_name, ' (', s.start_time, '-', s.end_time, ')')
        ELSE NULL 
    END) AS morning_schedule_1,
    GROUP_CONCAT(CASE 
        WHEN s.start_time = '09:30:00' AND s.end_time = '11:00:00' THEN CONCAT(s.schedule_id, ', ', t.first_name, ', ', t.last_name, ', ', sj.subject_name, ' (', s.start_time, '-', s.end_time, ')')
        ELSE NULL 
    END) AS morning_schedule_2,
    GROUP_CONCAT(CASE 
        WHEN s.start_time = '13:00:00' AND s.end_time = '14:00:00' THEN CONCAT(s.schedule_id, ', ', t.first_name, ', ', t.last_name, ', ', sj.subject_name, ' (', s.start_time, '-', s.end_time, ')')
        ELSE NULL 
    END) AS afternoon_schedule_1,
    GROUP_CONCAT(CASE 
        WHEN s.start_time = '14:30:00' AND s.end_time = '16:00:00' THEN CONCAT(s.schedule_id, ', ', t.first_name, ', ', t.last_name, ', ', sj.subject_name, ' (', s.start_time, '-', s.end_time, ')')
        ELSE NULL 
    END) AS afternoon_schedule_2
FROM 
    tb_schedules s 
JOIN 
    tb_subjects sj ON s.subject_id = sj.subject_id 
JOIN 
    tb_teacher t ON s.teacher_id = t.tc_id 
GROUP BY 
    s.class_name, s.day_of_week
ORDER BY 
    s.day_of_week, 
    s.start_time;
`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('An error occurred while fetching class schedules.');
            return;
        }
        res.json(results);
    });
});


// สร้าง endpoint สำหรับดึงข้อมูลตารางการสอนตามห้องเรียน
router.post('/class-schedules', (req, res) => {
    const className = req.body.class_name;
    const sql = `SELECT 
    s.class_name,
    s.day_of_week,
    GROUP_CONCAT(CASE 
        WHEN s.start_time = '08:00:00' AND s.end_time = '09:00:00' THEN CONCAT(s.schedule_id, ', ', t.first_name, ', ', t.last_name, ', ', sj.subject_name, ' (', s.start_time, '-', s.end_time, ')')
        ELSE NULL 
    END) AS morning_schedule_1,
    GROUP_CONCAT(CASE 
        WHEN s.start_time = '09:30:00' AND s.end_time = '11:00:00' THEN CONCAT(s.schedule_id, ', ', t.first_name, ', ', t.last_name, ', ', sj.subject_name, ' (', s.start_time, '-', s.end_time, ')')
        ELSE NULL 
    END) AS morning_schedule_2,
    GROUP_CONCAT(CASE 
        WHEN s.start_time = '13:00:00' AND s.end_time = '14:00:00' THEN CONCAT(s.schedule_id, ', ', t.first_name, ', ', t.last_name, ', ', sj.subject_name, ' (', s.start_time, '-', s.end_time, ')')
        ELSE NULL 
    END) AS afternoon_schedule_1,
    GROUP_CONCAT(CASE 
        WHEN s.start_time = '14:30:00' AND s.end_time = '16:00:00' THEN CONCAT(s.schedule_id, ', ', t.first_name, ', ', t.last_name, ', ', sj.subject_name, ' (', s.start_time, '-', s.end_time, ')')
        ELSE NULL 
    END) AS afternoon_schedule_2
FROM 
    tb_schedules s 
JOIN 
    tb_subjects sj ON s.subject_id = sj.subject_id 
JOIN 
    tb_teacher t ON s.teacher_id = t.tc_id 
WHERE 
    s.class_name = ?
GROUP BY 
    s.class_name, s.day_of_week
ORDER BY 
    s.day_of_week, 
    s.start_time;
`;

    db.query(sql, [className], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('An error occurred while fetching class schedules.');
            return;
        }
        res.json(results);
    });
});


router.get('/subjects', (req, res) => {
    const sql = 'SELECT * FROM tb_subjects';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('An error occurred while fetching subjects.');
            return;
        }
        res.json(results);
    });
});


router.post('/add_schedule', (req, res) => {
    const { teacher_id, subject_id, class_name, day_of_week, start_time, end_time } = req.body;

    const sql = `INSERT INTO tb_schedules (teacher_id, subject_id, class_name, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [teacher_id, subject_id, class_name, day_of_week, start_time, end_time], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('An error occurred while inserting schedule.');
            return;
        }
        res.status(200).json({ message: 'Schedule added successfully' });
    });
});

router.delete('/delete_schedule/:id', (req, res) => {
    const scheduleId = req.params.id;
    const sql = 'DELETE FROM tb_schedules WHERE schedule_id = ?';
    db.query(sql, [scheduleId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('An error occurred while deleting schedule.');
            return;
        }
        res.status(200).json({ message: 'Schedule deleted successfully' });
    });
});

module.exports = router;