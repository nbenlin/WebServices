const asyncErrorHandlerWrapper = require('express-async-handler');

const getInfo = asyncErrorHandlerWrapper( async (req, res) => {
    return res.status(200)
    .json({
        success:true,
        author: 23227
    });
});
module.exports = {
    getInfo
}