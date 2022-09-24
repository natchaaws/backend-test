const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secret = 'adminLogin'
const adminRoute = express.Router()
const connection = require('../config/db_config')

//สร้าง Admid
adminRoute.post('/adminReg', jsonParser,function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        connection.execute(
            'INSERT INTO admins (admintor, password) VALUES (?,?)',
                [req.body.admintor,
                 hash
                ],
         function(err, results, fields) {
           if (err) {
             res.json({status: 'error', message: err})
             return
           }
          res.json({status: 'ok'})
         }
       );
    });
})
// Admin Login 
adminRoute.post('/adlogin', jsonParser,function (req, res, next) {
  connection.execute(
      'SELECT * FROM admins WHERE admintor=?',
   [req.body.admintor],
   function(err, admins, fields) {
      if (err) { res.json({status: 'error', message: err}); return }
      if (admins.length == 0) { res.json({status: 'error', message: 'no user found'}); return }
      bcrypt.compare(req.body.password, admins[0].password, function(err, isLogin) {
          if (isLogin) {
              var token = jwt.sign({ 
                admintor: admins[0].admintor,
                admintorId: admins[0].adminId }, secret);
              res.json(
                {status: 'ok', message: 'login success', token ,admins})
          } else {
              res.json(
                {status: 'error', message: 'login faild'})
          }
      });
   }
 );
})

adminRoute.post('/admin-authen', jsonParser, function (req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      var decoded = jwt.verify(token, secret)
      res.json({status: 'ok', decoded})
    } catch(err) {
      res.json({status: 'error', message: err.message})
    }
  }) 


module.exports = adminRoute