var mysql = require('mysql');
var connection  = mysql.createPool({
  connectionLimit : 10000,
  host            : 'srv1235.hstgr.io',
  user            : 'u295847955_student',
  password        : 'P@r97778968',
  port            : 3306,
  database        : 'u295847955_student',
});
module.exports = connection;