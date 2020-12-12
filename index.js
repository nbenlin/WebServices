const express = require("express");
const dotenv = require("dotenv");
const routers = require('./routers');
const customErrorHandler = require('./middlewares/errors/customErrorHandler');
const bodyParser = require('body-parser');
const cors = require('cors');

// Environment variables
dotenv.config({
    path: "./config/env/config.env"
});
const app = express();

/* Body Parser Middleware */
app.use(bodyParser.urlencoded({ extended: true })); // to support JSON-encoded bodies
app.use(bodyParser.json());  // to support URL-encoded bodies

/* Routers Middleware */
app.use('/api', routers);

/* Error Handler */
app.use(customErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
})




