const express = require('express');
const regtRoute = express.Router();
const connection = require('../config/db_config')

/* Get รายชื่อคนลงทั้งเบียนทั้งหมด */
regtRoute.get('/regtrain', function (req, res, next) {
  connection.execute(
    'SELECT * FROM `regtrain`',
    function (err, results, fields) {
      res.json({ results })
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
})
/* get userReg id การลงทะเบียนของ user */
regtRoute.get('/regtrain-users/:id', async (req, res, next) => {
  try {
    connection.execute('SELECT * FROM `regtrain` WHERE id_train=?', [req.params.id], function (err, data, fields) {
      if (err) {
        return res.json({ status: "error", message: err })
      }
      return res.json(data)/* ถ้าหน้าไหนไม่ขึ้นให้ใช้ res.data แทน */
    }
    );
  } catch (err) {
    res.json({ status: 'error', message: err.message })
  }

})

// get ข้อมมูล inner join 3 ตาราง regtrain, train, users 
/* regtRoute.get('/regtrain-train-user' , function (req, res, next) {
  connection.execute(
    'SELECT regtrain.id_reg, regtrain.tname, regtrain.finame, regtrain.laname, regtrain.organ, regtrain.tel, regtrain.mail, regtrain.date_reg, regtrain.time_reg, train.id_train, train.project, train.subject, users.id_user,  users.sex, users.status FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user)',
  function(err, results, fields) {
      res.json({results})
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
  }
  );
}) */

// get ข้อมมูล inner join 3 ตาราง regtrain, train, users 
regtRoute.get('/regtrain-train-user', function (req, res, next) {
  try {
    connection.execute(
      'SELECT * FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user)',
      function (err, results) {
        if (err) {
          return res.json({ status: "error", message: err })
        }
        res.json(results)
        console.log(results); // results contains rows returned by server
      }
    );
  } catch (err) {
    return res.json({ status: "error", message: err.message })
  }

})

regtRoute.get('/ListUserOftrain/:id', async (req, res, next) => {
    try{
        connection.execute(
          'SELECT * FROM regtrain WHERE `id_train`=?',
          [req.params.id
          ],
          (err, results) => {
            if(err){
            return res.json({status:"error",message:err.message})
            }
            res.json(results)
        }
        )
    }catch(err){
        return res.json({status:"error",message:err.message})
    }
})



regtRoute.get('/ListOftrainChart/:id', async (req, res, next) => {
  try{
      connection.execute(
        'SELECT * FROM regtrain INNER JOIN users ON regtrain.id_user = users.id_user WHERE `id_train`=?',
        [req.params.id
        ],
        (err, results) => {
          if(err){
          return res.json({status:"error",message:err.message})
          }
          res.json(results)
      }
      )
  }catch(err){
      return res.json({status:"error",message:err.message})
  }
})




regtRoute.get('/regtrain-train-user-id/:id', function (req, res, next) {
  try {
    connection.execute(
      'SELECT * FROM (regtrain INNER JOIN train ON regtrain.id_train = train.id_train) WHERE `id_user`=?',
      [req.params.id], (err, results, fields) => {
        if (err) {
          return res.json({ status: "error", message: err })
        }
        res.json(results)
      }
    );
  } catch (err) {
    return res.json({ status: "error", message: err.message })
  }
})

/* get ลงทะเบียน id */
regtRoute.get('/regtrain/:id', function (req, res, next) {
  const id = req.params.id
  connection.execute(
    'SELECT * FROM `regtrain`', [
    id
  ],
    function (err, results, fields) {
      res.json({ results })
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
})

//Post
regtRoute.post('/create-regtrain', async (req, res, next) => {
  const { studentID ,tname, finame, laname, organ, tel, mail, date_reg, id_train, id_user } = req.body
  try {
    connection.execute('INSERT INTO `regtrain`(`studentID`,`tname`, `finame`, `laname`, `organ`, `tel`, `mail`, `date_reg`, `id_train`, `id_user`) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [studentID, tname, finame, laname, organ, tel, mail, date_reg, id_train, id_user], function (err, result) {
        if (err) {
          return res.json({ status: "error", message: err })
        }
        return res.json({ status: "ok", message: "ลงทะเบียนเรียบร้อย" })
      }
    );
  } catch (err) {
    return res.json({ status: "error", message: err.message })
  }
})

//put
regtRoute.put('/edit-regtrain/:id', function (req, res, next) {
  const id = req.params.id
  connection.execute(
    'UPDATE `regtrain` SET `studentID`=? ,`tname`=?, `finame`=?, `laname`=?, `organ`=?, `tel`=?, `mail`=?, `date_reg`=?, `id_train`=?, `id_user`=?  WHERE id_reg = ?',
    [
    req.body.studentID,
    req.body.tname,
    req.body.finame,
    req.body.laname,
    req.body.organ,
    req.body.mail,
    req.body.tel,
    req.body.date_reg,
    req.body.id_train,
    req.body.id_user,
      id
    ],
    function (err, result) {
      res.json(result);
    }
  );
})

//Put
regtRoute.put('/regtrain', function (req, res, next) {
  connection.execute(
    'UPDATE `regtrain` SET `studentID`=?, `tname`=?, `finame`=?, `laname`=?, `organ`=?, `tel`=?, `mail`=?, `date_reg`=?, `id_train`=?, `id_user`=?  WHERE id_reg = ?',
    [
    req.body.studentID,
    req.body.tname,
    req.body.finame,
    req.body.laname,
    req.body.organ,
    req.body.tel,
    req.body.mail,
    req.body.date_reg,
    req.body.id_train,
    req.body.id_user,
    req.body.id_reg
    ],
    function (err, result) {
      res.json(result);
    }
  );
})

//delete 
regtRoute.delete('/del-regtrain/:id', function (req, res, next) {
  const id = req.params.id
  connection.execute(
    'DELETE FROM `regtrain`  WHERE id_reg = ?',
    [
      id
    ],
    function (err, result) {
      res.json(result);
    }
  );
})


module.exports = regtRoute