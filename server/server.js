const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { Client } = require('pg');
const mysql = require('mysql2');

const PORT = process.env.PORT || 4000;


var corsOptions = {
   origin: [
      "http://localhost:3000", 
      "http://localhost:3000/register",
      "http://localhost:3000/createNurse",
      "http://localhost:3000/adminHome"
   ]
 };
 
app.use(cors(corsOptions));

// app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

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

app.post('/patient_dashboard', (req, res) => {

   // THIS SHOULD OUTPUT AN EMAIL
   console.log(`\n\nUser query params: [${req.body}`);

   const sql = "SELECT * FROM Patient WHERE `email`= ?";
   dataBase.query(sql,[req.body.emailData], (err, data) => { 
      if (err) {
         return res.json("Error retrieving data");
      }
      if (data.length > 0) {
         return res.json(data);
      } else {
         return res.json("No return value found");
      }
   });

   res.send("Hello patient!");
});

// This query will fetch all patients
app.get('/get_patients', (req, res) => {
   const getPatients = "SELECT * FROM patient";
   dataBase.query(getPatients, (err, result) => {
      if (err) return res.json({"message":"Server error"})
      console.log("Fetching patients...\n");
      return res.json(result);
   })
});

// This query will fetch the specified patient
app.get('/get_patient/:id', (req, res) => {
   const id = req.params.id;
   const getPatient = "SELECT * FROM patient WHERE `ssn` = ?";
   dataBase.query(getPatient, [id], (err, result) => {
      if (err) return res.json({"message":"Server error"})

      console.log("Fetching patient...\n");
      return res.json(result);
   })
});

// This query will register a patient
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
   const postLogin = "INSERT INTO login (`email`, `password`, `source`) VALUES (?, ?, ?)";
   const postLoginValues = [
      req.body.email,
      req.body.password,
      'patient'
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

      // return res.status(200).json(data);
   });

});

// This query will register a nurse
app.post('/registerNurse', (req, res) => {

   // Query and values for 'postNurse'
   const postNurse = "INSERT INTO nurse (`employee_id`, `fname`, `mi`, `lname`, `address`, `phone_number`, `gender`, `age`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
   const postNurseValues = [
      req.body.employee_id,
      req.body.fname,
      req.body.mi,
      req.body.lname,
      req.body.address,
      req.body.phone_number,
      req.body.gender,
      req.body.age,
      req.body.email,
      req.body.password
   ];

   // Query and values for 'postLogin'
   const postLogin = "INSERT INTO login (`email`, `password`, `source`) VALUES (?, ?, ?)";
   const postLoginValues = [
      req.body.email,
      req.body.password,
      'nurse'
   ];

   // This query will store a new nurse's data into 'nurse' table
   dataBase.query(postNurse, postNurseValues, (err, data) => {
      if (err) {
         console.error(err);
         return res.status(500).json({ error: "An error occurred" });
      }  

      console.log("\nRegistered nurse...\n")
      return res.status(200).json(data);
   });

   // This query will store a new nurse's data into 'login' table
   dataBase.query(postLogin, postLoginValues, (err, data) => {
      if (err) {
         console.error(err);
         return res.status(500).json({ error: "An error occurred" });
      }

      // return res.status(200).json(data);
   });
});

// This query will get all of the registered nurses
app.get('/get_nurses', (req, res) => {
   
   const getNurses = "SELECT * FROM nurse";
   dataBase.query(getNurses, (err, result) => {
      if (err) return res.json({"message":"Server error"})
      console.log("Fetching nurses...\n");
      return res.json(result);
   })
});

// This query will get the specified registered nurse
app.get('/get_nurse/:id', (req, res) => {
   const id = req.params.id;
   const getNurse = "SELECT * FROM nurse WHERE `employee_id` = ?";
   dataBase.query(getNurse, [id], (err, result) => {
      if (err) return res.json({"message":"Server error"})

      console.log("Fetching nurse...\n");
      return res.json(result);
   })
});

// This query will edit the specified registered nurse
app.post('/edit_nurse/:id', (req, res) => {
   const id = req.params.id;
   const editNurse = "UPDATE nurse SET `fname`=?, `mi`=?, `lname`=?, `address`=?, `phone_number`=?, `gender`=?, `age`=?, `email`=?, `password`=? WHERE `employee_id`=?";
   const editNurseValues = [
      req.body.fname,
      req.body.mi,
      req.body.lname,
      req.body.address,
      req.body.phone_number,
      req.body.gender,
      req.body.age,
      req.body.email,
      req.body.password,
      id
   ];

   dataBase.query(editNurse, editNurseValues, (err, result) => {
      if (err)
         return res.json({ message: "Something unexpected has occurred" + err });

      console.log("Updated nurse...\n");
      return res.json({ success: "Nurse updated successfully" });
   })
});

// This query will delete the specified registered nurse
app.delete('/delete_nurse/:id', (req, res) => {
   const id = req.params.id;
   const deleteNurse = "DELETE FROM nurse WHERE `employee_id`=?";
   const value = [id];

   dataBase.query(deleteNurse, value, (err, result) => {
      if (err)
         return res.json({ message: "Something unexpected has occurred" + err });

      console.log("Deleted nurse...\n");
      return res.json({ success: "Nurse deleted successfully" });
   })
});

// This query will fetch all of the vaccine data
app.get('/get_vaccines', (req, res) => {

   const getVaccines = "SELECT * FROM vaccine";
   dataBase.query(getVaccines, (err, result) => {
      if (err) return res.json({"message":"Server error"})
      console.log("Fetching vaccine data...\n");
      return res.json(result);
   })
});

// This query will update the specified vaccine
app.post('/updateVaccine/:name', (req, res) => {
   
})

app.post('/login', (req, res) => {
   // Displaying query parameters
   console.log(`\n\nUser query params: [${req.body.email}, ${req.body.password}, ${req.body.source}]`);

   const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ? AND `source` = ?";

   dataBase.query(sql, [req.body.email, req.body.password, req.body.source], (err, data) => {

      // Logging query result
      console.log("Query result:", data);
      
      if (err) {
         console.error("Database error:", err);
         return res.status(500).json("Error"); // Send a 500 Internal Server Error response
      }

      if (data.length > 0) {
         console.log("Successful login.");
         return res.json("Success");
      } else {
         console.log("Failed login.");
         return;
      }
   });
});

app.listen(PORT, () => {
   console.log(`Server Running on Port ${PORT}`);
});