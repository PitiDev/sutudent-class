var express = require('express');
const router = express.Router();


const userAPI = require('./controller/api_user');
const classAPI = require('./controller/api_class');
const teacherAPI = require('./controller/api_teacher');
const newsAPI = require('./controller/api_news');
const learnAPI = require('./controller/api_learn_table');
const studentAPI = require('./controller/api_student');
const loginAPI = require('./controller/api_login');
const registerAPI = require('./controller/api_register');
const absentAPI = require('./controller/api_absent');
const scoreAPI = require('./controller/api_score');

router.use(userAPI);
router.use(classAPI);
router.use(teacherAPI);
router.use(newsAPI);
router.use(learnAPI);
router.use(studentAPI);
router.use(loginAPI);
router.use(registerAPI);
router.use(absentAPI);
router.use(scoreAPI);

module.exports = router;