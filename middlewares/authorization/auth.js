const asyncErrorHandlerWrapper = require('express-async-handler');
const CustomError = require('../../helpers/error/customError');
const { isTokenIncluded, getAccesTokenFromHeader } = require('../../helpers/authorization/tokenHelpers');
const jwt = require('jsonwebtoken');

const getAccessToRoute = asyncErrorHandlerWrapper(async (req, res, next) => {
    const {JWT_SECRET_KEY} = process.env;
    if(!isTokenIncluded(req)) {
        return next(new CustomError("You are not authorized to access this route.", 401));
    }
    const accessToken = getAccesTokenFromHeader(req);
    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomError("You are not authorized to access this route.", 401));
        }
        req.user = {
            login: decoded.login
        }
        next();
    });
    next();
});

module.exports = {
    getAccessToRoute
};