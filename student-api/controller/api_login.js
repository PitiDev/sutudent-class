var express = require('express');
var router = express.Router();
var db = require('./../db');

 
router.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let sql = "SELECT * FROM tb_users WHERE username = ?";
    
    db.query(sql,[username],function(err, result) {
        if(err) throw err;
       console.log('data: ',result.length);
       
        if(result.length > 0) {
            console.log('password: ',password);
            if(password === result[0].password) {

                console.log("Login success");

                res.json({
                    'status' : 'success',
                    'token' : 'exaxsfsfefadc',
                    'username' : result[0].username,
                    'role' : result[0].role
                });
            } else {
                res.json({
                    'status' : 'error',
                    'token' : ''
                });
            }
        } else {
            res.json({
                'status' : 'error',
                'token' : ''
            });
        }
    });
});


module.exports = router;