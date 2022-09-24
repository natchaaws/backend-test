const express = require('express');
const trainRoute = express.Router();
const connection = require('../config/db_config')


trainRoute.get('/train-md', function (req, res, next) {
  connection.execute(
    'SELECT * FROM ((train INNER JOIN major ON train.majorId=major.majorId) INNER JOIN degree ON train.degreeId=degree.degreeId)',
    function (err, results, fields) {
      res.json(results)
      console.log(results); // results contains rows returned by server
    }
  );
})


/* get รายการอบรมทั้งหมด */
trainRoute.get('/train', function (req, res, next) {
  connection.execute(
    'SELECT * FROM `train`',
    function (err, results, fields) {
      res.json(results)
      console.log(results); // results contains rows returned by server
    }
  );
})
/* Get รายการอบรม  id */
trainRoute.get('/train/:id', function (req, res, next) {
  connection.execute(
    'SELECT * FROM `train` WHERE id_train=?', [
    id = req.params.id
  ],
    function (err, data) {
      if (err) {
        return next(err)
      } else {
        res.json(data)
      }
    }
  );
})

//Post เพิ่มรายการอบรม
trainRoute.post('/train', function (req, res, next) {
  connection.query(
    'INSERT INTO `train`(`project`, `subject`, `date`, `time_s`, `time_e`, `place`, `note`, `lecturer`, `lec_study`, `by_train`, `num`, `closeTrain`,`classId`, `degreeId`, `condition`, `hours_coop`, `closeForm`, `showForm`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [ req.body.project,
      req.body.subject,
      req.body.date,
      req.body.time_s,
      req.body.time_e,
      req.body.place,
      req.body.note,
      req.body.lecturer,
      req.body.lec_study,
      req.body.by_train,
      req.body.num,
      req.body.closeTrain,
      req.body.classId,
      req.body.degreeId,
      req.body.condition,
      req.body.hours_coop,
      req.body.closeForm,
      req.body.showForm
    ],
    function (err, result) {
      if(err){
        return res.json({status: "err", message: err.message} )
      }
      res.json({status: "ok", message: "เพิ่มรายการสำเร็จ"});
    }
  );
})

//Put อัพเดตข้อมูล
trainRoute.put('/train/:id', function (req, res, next) {
  const id = req.params.id
  connection.query(
    'UPDATE `train` SET `project`=?, `subject`=?, `date`=?, `time_s`=?, `time_e`=?, `place`=?, `note`=?, `lecturer`=?, `lec_study`=?, `by_train`=?, `num`=?, `closeTrain`=?,`classId`=?, `degreeId`=?, `condition`=?, `hours_coop`=?, `closeForm`=?, `showForm`=? WHERE id_train = ?',
    [
      req.body.project,
      req.body.subject,
      req.body.date,
      req.body.time_s,
      req.body.time_e,
      req.body.place,
      req.body.note,
      req.body.lecturer,
      req.body.lec_study,
      req.body.by_train,
      req.body.num,
      req.body.closeTrain,
      req.body.classId,
      req.body.degreeId,
      req.body.condition,
      req.body.hours_coop,
      req.body.closeForm,
      req.body.showForm,
      id
    ],
    function (err, data) {
      if(err){
        res.json({status: 'error', message: err})
    }else{
      res.json({status: 'ok', message: "Edit successfully",data})
    }
  }
  );
})

//Put อัพเดตข้อมูล สถานะ เปิด/ปิด
trainRoute.put('/train-closeTrain/:id', function (req, res, next) {
  const id = req.params.id
  connection.query(
    'UPDATE `train` SET `closeTrain`=? WHERE id_train = ?',
    [
      req.body.closeTrain,
      id
    ],
    function (err, data) {
      if(err){
        res.json({status: 'error', message: err})
    }else{
      res.json({status: 'ok', message: "Edit successfully",data})
    }
  }
  );
})

//delete รายการอบรม
trainRoute.delete('/train/:id', function (req, res, next) {
  const id = req.params.id
  connection.query(
    'DELETE FROM `train` WHERE id_train = ?',
    [
      id
    ],
    function (err, result) {
      res.json(result);
    }
  );
})

module.exports = trainRoute