const CustomError = require('../../helpers/error/customError');
const yup = require('yup');

let schema = yup.object().shape({
    name: yup
    .string()
    .trim()
    .max(10)
    .matches(/^[a-zA-Z]+$/)
    .required()
});

const yupValidate = (req, res, next) => {
    schema
    .isValid(req.params)
    .then(function (valid) {
        if (!valid) {
            return next(new CustomError("Please check parameters given by you.", 400));
        }
        return res.status(200)
        .json({
            success: true,
            data: `Hello, ${req.params.name}`
        });
    });
};
module.exports = { yupValidate };