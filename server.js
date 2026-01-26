require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const mysql = require("mysql2");
// Test database connection
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB,
});
connection.connect((err) => {
    if (err) {
        console.error("Failed to connect to database!", err);

        if (err.code === "ETIMEDOUT") {
            console.error(
                "→ Connection timeout! Check: network, firewall, DB is running?",
            );
        } else if (err.code === "ECONNREFUSED") {
            console.error(
                "→ Connection refused — is MySQL running? Wrong port/host?",
            );
        } else if (err.code === "ER_ACCESS_DENIED_ERROR") {
            console.error("→ Wrong username/password");
        }

        // Usually good idea to exit in development
        // In production → maybe retry logic instead
        process.exit(1);
        return;
    }
});
app.listen(PORT, () =>
    console.log(`Server er online og aktiv på:  localhost:${PORT}`),
);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/get/Items", (req, res) => {
    console.log("inn");
    
    connection.query(
        "SELECT * FROM ??.Items",
        [process.env.DB],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({message: "Error fetching processes"});
                
            }
            console.log("send");
            
            res.status(200).json(JSON.parse(JSON.stringify(result)));
        },
    );
});

app.use(express.static("public"));
