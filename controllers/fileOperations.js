const CustomError = require('../helpers/error/customError');
const asyncErrorHandlerWrapper = require('express-async-handler');

const storeData = asyncErrorHandlerWrapper( async (req, res, next) => {
    let storeArr = [];
    let data = req.body.input;
    storeArr.push(data);
    if ( !(typeof data !== 'undefined' && !!data) ) {
        return next(new CustomError("No data found, please check parameters given by you.", 404));
    }
    return res.status(201)
    .json({
        success: true,
        message: "Created successfully",
        data: storeArr
    });
});
module.exports = {
    storeData
};