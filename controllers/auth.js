const asyncErrorHandlerWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/customError');
const jwt = require('jsonwebtoken');

const user = {
    login: "nbenli",
    password: 23227
}

const login = asyncErrorHandlerWrapper(async (req, res, next) => {
    const {login, password} = req.body;
    if ( !(login === user.login && password === user.password) ) {
        return next(new CustomError("Login or password is invalid.", 401));
    }
    
    /* Create JWT */
    const {JWT_SECRET_KEY} = process.env;
    const accessToken = jwt.sign(user, JWT_SECRET_KEY);

    return res.status(200)
    .json({
        success: true,
        data: {
            login: user.login,
            AccessToken: accessToken
        }
    }); 
});

const getUser = asyncErrorHandlerWrapper(async (req, res) => {
    return res
    .status(200)
    .json({
        success: true,
        login: user.login,
        password: user.password
    });
});

module.exports = {
    login,
    getUser
}