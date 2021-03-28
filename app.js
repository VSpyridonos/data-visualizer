require('dotenv').config();
const express = require('express');
const mysql = require('mysql');




// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE
})

// Connect db
db.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected...");
})

const app = express();

// Create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE gap';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created!')
    })
})

// Create table
app.get('/createposttable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT)';
})


const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});