const CustomError = require('../../helpers/error/customError');

const customErrorHandler = (err, req, res, next) => {
    let customError = err;

    console.log(err);

    res
    .status(customError.status || 500)
    .json({
        success: false,
        message: customError.message
    });
}
module.exports = customErrorHandler;