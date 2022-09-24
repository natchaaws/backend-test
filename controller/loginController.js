const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secret = 'Fullstack-Login-2021'
const loginRoute = express.Router()

const connection = require('../config/db_config')

/* get user FK (ID เพศ สาขา ชั้นปี ปริญญา)  */
loginRoute.get('/user-data/:id', function (req, res, next) {
  try {
    connection.execute(
      'SELECT * FROM ((((users INNER JOIN classyear ON users.classId=classyear.classId) INNER JOIN gender ON users.genderId=gender.genderId) INNER JOIN major ON users.majorId=major.majorId) INNER JOIN degree ON users.degreeId=degree.degreeId) ',
      function (err, results) {
        if (err) {
          return res.json({ status: "error", message: err })
        }
        res.json( results )
        console.log(results); // results contains rows returned by server
      }
    );
  } catch (err) {
    return res.json({ status: "error", message: err.message })
  }

})

/* get classyear ชั้นปี */
loginRoute.get('/classyear' , function (req, res, next) {
  connection.query(
  'SELECT * FROM `classyear`',
  function(err, results, fields) {
      res.json({results})
      console.log(results); // results contains rows returned by server
  }
  );
})

/* get gender เพศ*/
loginRoute.get('/gender' , function (req, res, next) {
  connection.query(
  'SELECT * FROM `gender`',
  function(err, results, fields) {
      res.json({results})
      console.log(results); // results contains rows returned by server
  }
  );
})


/* get major สาขา*/
loginRoute.get('/major' , function (req, res, next) {
  connection.query(
  'SELECT * FROM `major`',
  function(err, results, fields) {
      res.json({results})
      console.log(results); // results contains rows returned by server
  }
  );
})

/* get degree ระดับปริญญา*/
loginRoute.get('/degree' , function (req, res, next) {
  connection.query(
  'SELECT * FROM `degree`',
  function(err, results, fields) {
      res.json({results})
      console.log(results); // results contains rows returned by server
  }
  );
})

/* get all user */
loginRoute.get('/get-users', async (req, res ,next) => {
  try{
    connection.query("SELECT * FROM `users`",(err, data, results) => {
      if(err){
        console.log(err); return res.json({status:"error", message:err});
      }
      res.json({status:"ok", message: data})
    })
  }catch (err){
    res.json({status:"error",message:err.message})
  }
});

/* get user by id */
loginRoute.get('/get-users/:id', async (req, res ,next) => {
  try{
    connection.query("SELECT * FROM `users` WHERE id_user=?",[req.params.id || req.body.id_user],(err, data, results) => {
      if(err){
        console.log(err); return res.json({status:"error", message:err});
      }
      res.json(data)
    })
  }catch (err){
    res.json({status:"error",message:err.message})
  }
});

/* || get user by id */
/* loginRoute.get('/get-users-id', async (req, res ,next) => {
  try{
    connection.query("SELECT * FROM `users` WHERE id_user=?",[req.body.id_user],(err, data, results) => {
      if(err){
        console.log(err); return res.json({status:"error", message:err});
      }
      res.json({status:"ok", data})
    })
  }catch (err){
    res.json({status:"error",message:err.message})
  }
}); */

/* เข้าสู่ระบบ user */
loginRoute.post('/register', jsonParser,function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        connection.execute(
            'INSERT INTO `users`(`email`, `password`, `fname`, `lname`, `genderId`, `majorId`, `degreeId`, `classId`, `university`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
         [req.body.email, 
          hash, 
          req.body.fname, 
          req.body.lname,
          req.body.genderId,
          req.body.majorId, 
          req.body.degreeId,
          req.body.classId, 
          req.body.university,
          req.body.status

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

/* แก้ไข user */
loginRoute.put('/edituser/:id', jsonParser,function (req, res, next) {
    const id_user = req.params.id;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        connection.execute(
            'UPDATE users SET email=?, password=?, fname=?, lname=?, genderId=?, majorId=?, degreeId=?, classId=?, university=?, status=? WHERE id_user=?',
         [req.body.email,
          hash,
          req.body.fname, 
          req.body.lname,
          req.body.genderId,
          req.body.majorId, 
          req.body.degreeId,
          req.body.classId, 
          req.body.university,
          req.body.status, 
          id_user
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

/* delete user */
loginRoute.delete('/deleteuser/:id',function (req, res, next) {
    const id_user = req.params.id;

        connection.query(
            'DELETE FROM users WHERE id=?',
         [
            id_user
         ],
         function(err, results, fields) {
           if (err) {
             res.json({status: 'error', message: err})
             return
           }
          res.json({status: 'ok'})
         }
       );
})


loginRoute.post('/login', jsonParser,function (req, res, next) {
    connection.execute(
        'SELECT * FROM users WHERE email=?',
     [req.body.email],
     function(err, users, fields) {
        if (err) { 
          res.json({status: 'error', message: err}); 
          return }
        if (users.length == 0) { res.json({status: 'error', message: 'no user found'}); 
          return }
        bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
            if (isLogin) {
                var token = jwt.sign({ 
                  userId: users[0].id_user,
                  email: users[0].email, 
                  firstName: users[0].fname, 
                  lastName: users[0].lname, 
                  majorId: users[0].majorId, 
                  degreeId: users[0].degreeId,
                  StatusUser: users[0].status}, 
                  secret/* , { expiresIn: '1h' } */);
                res.json(
                  {status: 'ok', message: 'login success', token ,users})
            } else {
                res.json(
                  {status: 'error', message: 'login faild'})
            }
        });
     }
   );
})

loginRoute.post('/authen', jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token, secret)
    res.json({status: 'ok', decoded})
  } catch(err) {
    res.json({status: 'error', message: err.message})
  }
}) 

module.exports = loginRoute