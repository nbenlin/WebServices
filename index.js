const express = require("express");
const dotenv = require("dotenv");
const yup = require('yup');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const { nextTick } = require("process");
const { json } = require("body-parser");
const cors = require('cors');

// Environment variables
dotenv.config({
    path: "./config/env/config.env"
});

/* YUP SCHEMA */
let schema = yup.object().shape({
    name: yup
    .string()
    .trim()
    .max(10)
    .matches(/^[a-zA-Z]+$/)
    .required()
});

const PORT = process.env.PORT;
const app = express();

app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
})

app.use(bodyParser.urlencoded({ extended: true })); // to support JSON-encoded bodies
app.use(bodyParser.json());  // to support URL-encoded bodies
app.use(cors());


/* TEMAT 2 */
app.get("/info", (req, res) => {
    res
    .status(200)
    .json({
        success: true,
        author: 23227
    });
});

app.get("/hello/:name", (req, res) => {
    schema
    .isValid(req.params)
    .then(function (valid) {
        if (valid) {
            return res.status(200)
            .json({
                success: true,
                message: `Hi, ${req.params.name}`
            });
        }
        return res.status(400)
        .json({
            success: true,
            message: "Błąd, please check parameters given by you."
        });        
    });
});

app.post("/store", (req, res) => {
    let dataArr = [];
    let data = req.body.input;
    dataArr.push(data);
    res.json({stored_data : dataArr});
    res.status(201);    
});

/***** temat 3 ******/

app.post('/parse', (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        fs.readFile(files.file.path, function read(err, data){
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
                    subValues.forEach((subItem => {
                        const [subKey, subValue] = subItem.split(":");
                        result[key][subKey] = Number(subValue);
                    }));
                }
            });
            console.log(err);
        });
        // if(err) {
        //     next(err);
        //     return;
        // }
        // fs.readFile(files.toParse.path, 'utf-8', (err, data) => {
        //     if(err) throw err;
        //     res.json(data.toString());
        //     res.status(200);
        // });
    });
});
