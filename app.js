require('dotenv').config();
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const ejsMate = require('ejs-mate');

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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
app.get('/', (req, res) => {
    res.render('index');
})


const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});