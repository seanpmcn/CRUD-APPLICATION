const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
import { mysqlPassword } from './assets';

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: mysqlPassword,
    database: "crud_database" 
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
    });
});

app.post("/api/insert", (req, res) => {
 
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});