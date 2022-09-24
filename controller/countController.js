const express = require('express');
const countRoute = express.Router();
const connection = require('../config/db_config')

// นับจำนวนผู้ลงทะเบียนทั้งหมด 
countRoute.get('/CountAllUser/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) NUM_total_all FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ?;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนเพศชาย  `genderId`= 1
countRoute.get('/CountMale/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) NUM_total_male FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`genderId`= 1;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนเพศหญิง `genderId`= 2
countRoute.get('/CountFemale/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) NUM_total_female FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`genderId`= 2;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})

// นับจำนวนระดับปริญญาตรี `degreeId`= 1;
countRoute.get('/CountDegree1/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_degree_1 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`degreeId`= 1;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนระดับปริญญาโท `degreeId`= 2;
countRoute.get('/CountDegree2/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_degree_2 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`degreeId`= 2;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนระดับปริญญาเอก `degreeId`= 3;
countRoute.get('/CountDegree3/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_degree_3 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`degreeId`= 3;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนระดับบัณฑิตศึกษา `degreeId`= 4;
countRoute.get('/CountDegree4/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_degree_4 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`degreeId`= 4;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนระดับอื่นๆ `degreeId`= 5;
countRoute.get('/CountDegree5/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_degree_5 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`degreeId`= 5;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})

// นับจำนวนชั้นปี1 `classId`= 1;
countRoute.get('/Count_Classyear_1/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_classyear_1 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`classId`= 1;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนชั้นปี2 `classId`= 2;
countRoute.get('/Count_Classyear_2/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_classyear_2 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`classId`= 2;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนชั้นปี3 `classId`= 3;
countRoute.get('/Count_Classyear_3/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_classyear_3 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`classId`= 3;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนชั้นปี4 `classId`= 4;
countRoute.get('/Count_Classyear_4/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_classyear_4 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`classId`= 4;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนชั้นปี5-8 `classId`= 5;
countRoute.get('/Count_Classyear_5/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_classyear_5 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`classId`= 5;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนชั้นปีอื่นๆ `classId`= 6;
countRoute.get('/Count_Classyear_6/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_classyear_6 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`classId`= 6;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})

// นับจำนวนสาขาคอมซาย `majorId`= 1;
countRoute.get('/Count_Major_1/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_Major_1 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`majorId`= 1;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนสาขาIT `majorId`= 2;
countRoute.get('/Count_Major_2/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_Major_2 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`majorId`= 2;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนสาขาคณิตศาสตร์ `majorId`= 3;
countRoute.get('/Count_Major_3/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_Major_3 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`majorId`= 3;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนสาขาสถิติ `majorId`= 4;
countRoute.get('/Count_Major_4/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_Major_4 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`majorId`= 4;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนสาขาชีววิทยา `majorId`= 6;
countRoute.get('/Count_Major_6/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_Major_6 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`majorId`= 6;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนสาขาเคมี `majorId`= 7;
countRoute.get('/Count_Major_7/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_Major_7 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`majorId`= 7;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนสาขาฟิสิกส์ `majorId`= 8;
countRoute.get('/Count_Major_8/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_Major_8 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`majorId`= 8;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนสาขาฟิสิกส์ประยุกต์ `majorId`= 9;
countRoute.get('/Count_Major_9/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_Major_9 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`majorId`= 9;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
// นับจำนวนอื่นๆ `majorId`= 10;
countRoute.get('/Count_Major_10/:id', async (req, res, next) => {
    try {
        connection.execute(
            'SELECT COUNT(*) Total_Major_10 FROM ((regtrain INNER JOIN train ON regtrain.id_train=train.id_train) INNER JOIN users ON regtrain.id_user=users.id_user) WHERE `train`.`id_train` = ? &&`users`.`majorId`= 10;',
            [req.params.id
            ],
            (err, results) => {
                if (err) {
                    return res.json({ status: "error", message: err.message })
                }
                res.json(results)
            }
        )
    } catch (err) {
        return res.json({ status: "error", message: err.message })
    }
})
module.exports = countRoute
