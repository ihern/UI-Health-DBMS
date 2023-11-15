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

app.get('/login', (req, res) => {
   res.send("sup");
});

app.get('/register', (req, res) => {
   res.send("beep boop");
});

app.get('/admin_dashboard', (req, res) => {
   res.send("Hello admin!");
});

app.get('/nurse_dashboard', (req, res) => {
   res.send("Hello nurse!");
});

app.get('/patient_dashboard', (req, res) => {
   res.send("Hello patient!");
});

app.post('/register', (req, res) => {
   
   // Query and values for 'postPatient'
   const postPatient = "INSERT INTO patient (`ssn`, `fname`, `mi`, `lname`, `address`, `phone_number`, `race`, `gender`, `age`, `medical_history`, `occupation_class`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
   const postPatientValues = [
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

   // Query and values for 'postLogin'
   const postLogin = "INSERT INTO login (`email`, `password`) VALUES (?, ?)";
   const postLoginValues = [
      req.body.email,
      req.body.password,
   ];

   // This query will store a new patient's data into 'patient' table
   dataBase.query(postPatient, postPatientValues, (err, data) => {
      if (err) {
         console.error(err);
         return res.status(500).json({ error: "An error occurred" });
      }

      return res.status(200).json(data);
   });

   // This query will store a new patient's data into 'login' table
   dataBase.query(postLogin, postLoginValues, (err, data) => {
      if (err) {
         console.error(err);
         return res.status(500).json({ error: "An error occurred" });
      }

      return res.status(200).json(data);
   });

});

app.post('/login', (req, res) => {
   // Displaying query parameters
   console.log(`\n\nUser query params: [${req.body.email}, ${req.body.password}, ${req.body.source}]`);

   const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ? AND `source` = ?";

   dataBase.query(sql, [req.body.email, req.body.password, req.body.source], (err, data) => {

      // Logging query result
      console.log("Query result:", data);
      
      if (err) {
         return res.json("Error");
      }

      if (data.length > 0) {
         console.log("Successful login.");
         return res.json("Success");
      } else {
         console.log("Failed login.")
         return res.json("Failed");
      }
   });
});

// app.post('/login', (req, res) => {
//    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
//    dataBase.query(sql, [req.body.email, req.body.password], (err, data) => {
//       if (err) {
//          return res.json("Error");
//       }

//       if (data.length > 0) {
//          const userSource = data[0].source;
//          if (userSource === req.body.source) {
//             return res.json("Success");
//          } else {
//             return res.json("Failed: Source does not match.");
//          }
//       } else {
//          return res.json("Failed");
//       }
//    });
// });



app.listen(PORT, () => {
   console.log(`Server Running on Port ${PORT}`);
});