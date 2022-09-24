const Login = require('../controller/loginController')
const Train = require('../controller/trainController')
const RegT = require('../controller/regTrainController')
const Rev = require('../controller/reviewController')
const Admin = require('../controller/adminController')
const Count = require('../controller/countController')

module.exports = (app) => {
    
    app.use(Login);
    app.use(Train);
    app.use(RegT);
    app.use(Rev);
    app.use(Admin);
    app.use(Count);
}