const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { Client } = require('pg');
const mysql = require('mysql2');

const PORT = process.env.PORT || 4000;

// app.use(express.json());

var corsOptions = {
   origin: "http://localhost:4000"
 };
 
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Creating database connection
// const dataBase = mysql.createConnection({
//    host: 'localhost',
//    user: 'root',
//    password: '',
//    database: 'ui-health-db'
// })

app.get('/', (req, res) => {
   res.send("Hello world!")
});

app.post('/register', (req, res) => {
   const sql  = "INSERT INTO patient ('name', 'ssn', 'age', 'gender', 'race', 'occupation', 'medhist', 'phone', 'address', 'email', 'password') VALUES (?)";
   const values = [
      req.body.name,
      req.body.ssn,
      req.body.age,
      req.body.gender,
      req.body.race,
      req.body.occupation,
      req.body.medhist,
      req.body.phone,
      req.body.address,
      req.body.email,
      req.body.password
   ]
   
   dataBase.query(sql, [values], (err, data) => {
      if (err) {
         return res.json("Error")
      }

      return res.json(data);
   });
})

app.listen(PORT, () => {
   console.log(`Server Running on Port ${PORT}`);
});