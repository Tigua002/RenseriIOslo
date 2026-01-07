require("dotenv").config()
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const mysql = require('mysql2');
// Test database connection
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB
});
connection.connect();
app.listen(PORT, () => console.log(`Server er online og aktiv på:  localhost:${PORT}`));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static("public"));
