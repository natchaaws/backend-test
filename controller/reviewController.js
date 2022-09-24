const express = require('express');
const reviewRoute = express.Router();
const connection = require('../config/db_config')


reviewRoute.get('/review' , function (req, res, next) {
    connection.query(
    'SELECT * FROM `review`',
    function(err, results, fields) {
        res.json({results})
        console.log(results); // results contains rows returned by server
    }
    );
})

//Post
reviewRoute.post('/review' , function (req, res, next) {
    connection.query(
        'INSERT INTO `review`(`sub`, `comment`, `date_rev`, `time_rev`) VALUES (?, ?, ?, ?)',
          [ req.body.sub, 
            req.body.comment,
            req.body.date_rev,
            req.body.time_rev
          ],
          function(err, result) {
            res.json(result);
        }
    );
})

//Put
reviewRoute.put('/review' , function (req, res, next) {
    connection.query(
        'UPDATE `review` SET `sub`=?, `comment`=?, `date_rev`=?, `time_rev`=? WHERE id_re = ?',
          [ req.body.sub, 
            req.body.comment,
            req.body.date_rev,
            req.body.time_rev,
            req.body.id_re
          ],
          function(err, result) {
            res.json(result);
        }
    );
})

//delete
reviewRoute.delete('/review' , function (req, res, next) {
    connection.query(
        'DELETE FROM `review`  WHERE id_re = ?',
          [ 
            req.body.id_re
          ],
          function(err, result) {
            res.json(result);
        }
    );
})




module.exports =  reviewRoute