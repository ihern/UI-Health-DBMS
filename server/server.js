const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { Client } = require('pg');
const mysql = require('mysql2');

const PORT = process.env.PORT || 4000;


var corsOptions = {
   origin: ["http://localhost:3000", "http://localhost:3000/register"]
 };
 
app.use(cors(corsOptions));

// app.use(cors());
app.use(express.json());

// app.use(bodyParser.json());

// Creating database connection
const dataBase = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "ui-health-db"
});

app.get('/', (req, res) => {
   res.send("Hello world!");
});

app.get('/register', (req, res) => {
   res.send("beep boop");
});

app.post('/register', (req, res) => {
   const sql = "INSERT INTO patient (`ssn`, `fname`, `mi`, `lname`, `address`, `phone_number`, `race`, `gender`, `age`, `medical_history`, `occupation_class`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
   const values = [
      req.body.ssn,
      req.body.fname,
      req.body.mi,
      req.body.lname,
      req.body.address,
      req.body.phone_number,
      req.body.race,
      req.body.gender,
      req.body.age,
      req.body.medical_history,
      req.body.occupation_class,
      req.body.email,
      req.body.password
   ];

   dataBase.query(sql, values, (err, data) => {
      if (err) {
         console.error(err);
         return res.status(500).json({ error: "An error occurred" });
      }

      return res.status(200).json(data);
   });
});

app.post('/login', (req, res) => {
   const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
   dataBase.query(sql, [req.body.email, req.body.password], (err, data) => {
      if (err) {
         return res.json("Error");
      }

      if (data.length > 0) { // TODO: Add condition here to check for the radio button value?
         return res.json("Success");
      } else {
         return res.json("Failed");
      }
   })
})



app.listen(PORT, () => {
   console.log(`Server Running on Port ${PORT}`);
});