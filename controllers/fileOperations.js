const CustomError = require('../helpers/error/customError');
const asyncErrorHandlerWrapper = require('express-async-handler');
const formidable = require('formidable');
const fs = require('fs');

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

const parsing = asyncErrorHandlerWrapper( async (req, res) => {
    const form = formidable( { multiples: true });
    form.parse(req, (err, fields, files) => {
        fs.readFile(files.file.path, function read(err, data) {
            const values = data.toString().trim().split(";");
            const result = {};
            values.forEach((item) => {
                const parsedItem = item.replace(":", ";");
                const [key, value] = parsedItem.split(";");
                const parsedValue = Number(value);
                if (!Number.isNaN(parsedValue)) {
                    result[key] = parsedValue;
                } else {
                    const subValues = value.split(",");
                    result[key] = {};
                    subValues.forEach((subItem) => {
                        const [subKey, subValue] = subItem.split(":");
                        result[key][subKey] = Number(subValue);
                    });
                }
            });
            return res.status(200)
            .json({
                result: result
            });
        });
    });
});
module.exports = {
    storeData,
    parsing
};