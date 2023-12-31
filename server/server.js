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



app.post('/nurse_dashboard', (req, res) => {
   // THIS SHOULD OUTPUT AN EMAIL
   console.log(`\n\nUser query params: ${req.body.emailD}`);

   const sql = "SELECT * FROM Nurse WHERE `email`= ?";
   dataBase.query(sql,[req.body.emailD], (err, data) => { 
      if (err) {
         return res.json("Error retrieving data");
      }
      if (data.length > 0) {
         return res.json(data);
      } else {
         return res.json("No return value found");
      }
   });
});

app.post('/patient_dashboard', (req, res) => {

   // THIS SHOULD OUTPUT AN EMAIL
   console.log(`\n\nUser query params: ${req.body.emailD}`);

   const sql = "SELECT * FROM Patient WHERE `email`= ?";
   dataBase.query(sql,[req.body.emailD], (err, data) => { 
      if (err) {
         return res.json("Error retrieving data");
      }
      if (data.length > 0) {
         return res.json(data);
      } else {
         return res.json("No return value found");
      }
   });
});

app.post('/patient_update', (req, res) => {

   // THIS SHOULD OUTPUT AN EMAIL
   console.log(`\n\Updated user query params: ${req.body[10]}`);

   const sql = 'UPDATE Patient SET `fname` = ?, `mi` = ?, `lname` = ?, `address` = ?, `phone_number` = ?, `race`= ?, `gender`=?, `age`= ?, `medical_history` = ?, `occupation_class` = ?, `ssn` = ?, `email` = ? WHERE email = ?';
   const patientUpdatedValues = [
      req.body[0],
      req.body[1],
      req.body[2],
      req.body[3],
      req.body[4],
      req.body[5],
      req.body[6],
      req.body[7],
      req.body[8],
      req.body[9],
      req.body[11],
      req.body[10],
      req.body[10]
   ];
   
   dataBase.query(sql, patientUpdatedValues, (err, data) => { 
      if (err) {
         return res.json("Error retrieving data");
      }
      if (data.length > 0) {
         return res.json("Update Successful");
      } else {
         return res.json("No data updates: Error");
      }
   });
});

app.post('/nurse_update', (req, res) => {

   // THIS SHOULD OUTPUT AN EMAIL
   console.log(`\n\Updating nurse w/ email: ${req.body[2]}`);

   const sql = 'UPDATE Nurse SET  `address` = ?, `phone_number` = ? WHERE email = ?';
   const patientUpdatedValues = [
      req.body[0],
      req.body[1],
   ];
   
   dataBase.query(sql, patientUpdatedValues, (err, data) => { 
      if (err) {
         return res.json("Error retrieving data");
      }
      if (data.length > 0) {
         return res.json("Update Successful");
      } else {
         return res.json("No data updates: Error");
      }
   });
});

app.post('/nurse_availability', (req, res) => {

   console.log(`\n\Updating nurse w/ id: ${req.body[1]}`);
   const sql = 'INSERT INTO vaccine_scheduling_nurses (`nurse_id`, `time_slot`) VALUES (?, ?)';
   const patientUpdatedValues = [
      req.body[1],
      req.body[0],
   ];
   dataBase.query(sql, patientUpdatedValues, (err, data) => { 
      if (err) {
         return res.json("Error inserting data");
      }
      if (data.length > 0) {
         return res.json("Insert Successful");
      } else {
         return res.json("Error inserting availability");
      }
   });
});

app.post('/patient_select_appt', (req, res) => {

   console.log(`\n\Making appt for ssn: ${req.body[0]}, ${req.body[1]}, ${req.body[2]}, ${req.body[3]}`);

   let avail = 0;
   let held = 0;

   const getAmounts = "SELECT `available`, `on_hold` FROM Vaccine WHERE `name` = ?";
   dataBase.query(getAmounts, [req.body[3]], (err, data) => { 
      if (err) {
         console.log(err);
      }
      avail = data[0].available;
      held = data[0].on_hold;

      avail -= 1;
      held += 1;
      console.log(avail);
      console.log(held);
   
      const upd = "UPDATE Vaccine SET `available` = ?, `on_hold` = ? WHERE `name` = ?"
      dataBase.query(upd, [avail, held, req.body[3]], (err, data) => { 
         if (err) {
            console.log(err);
         }
         console.log("Updated vaccine availability and hold successfully");
      });
   });

   const sql = 'INSERT INTO vaccine_scheduling (`nurse_id`, `patient_id`, `time_slot`, `vaccine`) VALUES (?, ?, ?, ?)';
   const patientUpdatedValues = [
      req.body[0],
      req.body[1],
      req.body[2],
      req.body[3],
   ];
   dataBase.query(sql, patientUpdatedValues, (err, data) => { 
      if (err) {
         console.log(err);
         return res.json("Error");
      }
      return res.json("Inserting appointment");
  
   });
});

app.post('/patient_per_nurse', (req, res) => {

   console.log(`\n\Checking patients per nurse constraint: ${req.body[0]}, ${req.body[2]}`);
   const sql = "SELECT COUNT(*) as count FROM vaccine_scheduling WHERE `nurse_id` = ? AND `time_slot` = ?";
   const patientUpdatedValues = [
      req.body[0],
      req.body[2],
   ];
   dataBase.query(sql, patientUpdatedValues, (err, data) => { 
      if (err) {
         console.log(err);
         return res.json("Error");
      }
      console.log(data[0].count);
      if (data[0].count >= 10 ) {
         return res.json("Yes");
      }
      return res.json("Good to go");
   });
});

app.post('/nurse_per_hour', (req, res) => {

   console.log(`\n\Checking nurses per hour constraint: ${req.body[0]}`);
   const sql = "SELECT COUNT(*) as count FROM vaccine_scheduling_nurses WHERE `time_slot` = ?";
   const patientUpdatedValues = [
      req.body[0],
   ];
   dataBase.query(sql, patientUpdatedValues, (err, data) => { 
      if (err) {
         console.log(err);
         return res.json("Error");
      }
      console.log(data[0].count);
      if (data[0].count >= 12 ) {
         return res.json("Yes");
      }
      return res.json("Good to go");
   });
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

// This query will get the specified patient's scheduled time slots
app.get('/get_patient_schedule/:id', (req, res) => {
   const id = req.params.id;
   const getSchedule = "SELECT `time_slot` FROM vaccine_scheduling WHERE `patient_id`=?";
   dataBase.query(getSchedule, [id], (err, result) => {
      if (err) return res.json({"message":"Server error getting schedule"})

      console.log("Fetching patient schedule...\n");
      return res.json(result);
   });
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

      console.log("\nRegistering nurse...\n");
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

// This query will get the specified nurse's scheduled time slots
app.get('/get_nurse_schedule/:id', (req, res) => {
   const id = req.params.id;
   const getSchedule = "SELECT `time_slot` FROM vaccine_scheduling WHERE `nurse_id`=?";
   dataBase.query(getSchedule, [id], (err, result) => {
      if (err) return res.json({"message":"Server error getting schedule"})

      console.log("Fetching nurse schedule...\n");
      return res.json(result);
   });
})

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

// This query will delete the specified registered nurse and their login info
app.delete('/delete_nurse/:id', (req, res) => {
   const id = req.params.id;
   const deleteNurse = "DELETE FROM nurse WHERE `employee_id`=?";
   const getNurseEmail = "SELECT `email` FROM nurse WHERE `employee_id`=?";
   const deleteNurseLogin = "DELETE FROM login WHERE `email`=?";

   // Step 1: Get the nurse's email
   dataBase.query(getNurseEmail, [id], (err, result) => {
      if (err)
         return res.json({ message: "Something unexpected has occurred" + err });

      const nurseEmail = result[0].email;

      // Step 2: Delete from 'login' table using the obtained email
      dataBase.query(deleteNurseLogin, [nurseEmail], (err, result) => {
         if (err)
            return res.json({ message: "Something unexpected has occurred" + err });

         // Step 3: Delete from 'nurse' table
         dataBase.query(deleteNurse, [id], (err, result) => {
            if (err)
               return res.json({ message: "Something unexpected has occurred" + err });

            console.log("Deleting nurse...\n");
            return res.json({ success: "Nurse deleted successfully" });
         });
      });
   });
});

// This query will fetch the specified vaccine
app.get('/get_vaccine/:name', (req, res) => {

   const name = req.params.name;
   const getVaccine = "SELECT * FROM vaccine WHERE `name` = ?";
   
   dataBase.query(getVaccine, [name], (err, result) => {

      // Error checking
      if (err) return res.json({"message":"Server error"})

      console.log("Fetching vaccine information...\n");
      return res.json(result);
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

// This query will add a vaccine to the 'vaccine' table
app.post('/addVaccine', (req, res) => {

   const postVaccine = "INSERT INTO vaccine (`name`, `company_name`, `number_of_doses`, `available`, `on_hold`, `description`) VALUES (?, ?, ?, ?, ?, ?)";
   const postVaccineValues = [
      req.body.name,
      req.body.company_name,
      req.body.number_of_doses,
      req.body.available,
      req.body.on_hold,
      req.body.description
   ];

   dataBase.query(postVaccine, postVaccineValues, (err, data) => {
      if (err) {
         console.error(err);
         return res.status(500).json({ error: "An error occurred" });
      }  

      console.log("Adding vaccine...\n");
      return res.status(200).json(data);
   });
});

// This query will update the specified vaccine
app.post('/update_vaccine/:name', (req, res) => {
   const name = req.params.name;
   const updateVaccine = "UPDATE vaccine SET `name`=?, `company_name`=?, `number_of_doses`=?, `available`=?, `on_hold`=?, `description`=? WHERE `name`=?";
   const updateVaccineValues = [
      req.body.name,
      req.body.company_name,
      req.body.number_of_doses,
      req.body.available,
      req.body.on_hold,
      req.body.description,
      name
   ];

   dataBase.query(updateVaccine, updateVaccineValues, (err, result) => {
      if (err)
         return res.json({ message: "Something unexpected has occurred" + err });

      console.log("Updated vaccine repository...\n");
      return res.json({ success: "Vaccine updated successfully" });
   })
});

app.get('/get_schedule', (req, res) => {
   
   const sql = "SELECT * FROM vaccine_scheduling_nurses";
   dataBase.query(sql, (err, result) => {
      if (err) return res.json({"message":"Server error getting schedule"})
      console.log("Fetching schedule...\n");
      return res.json(result);
   })
});

app.get('/get_vaccines_available', (req, res) => {
   
   const sql = "SELECT `name` FROM vaccine WHERE `available` > 0 " ;
   dataBase.query(sql, (err, result) => {
      if (err) return res.json({"message":"Server error getting vaccines"})
      console.log("Fetching vaccines...\n");
      return res.json(result);
   })
});

app.post('/get_appointments_patients', (req, res) => {
   console.log(`\n\nUser ssn: ${req.body.patient}`);
   const sql = "SELECT `time_slot` FROM vaccine_scheduling WHERE `patient_id` = ?";
   dataBase.query(sql, [req.body.patient], (err, result) => {
      if (err) return res.json({"message":"Server error getting matching appointments"})
      console.log("Fetching matching appointments...\n");
      return res.json(result);
   })
});

app.post('/get_appointments_nurses', (req, res) => {
   console.log(`\n\nUser employee_id: ${req.body.nurse}`);
   const sql = "SELECT `time_slot`, `patient_id` FROM vaccine_scheduling WHERE `nurse_id` = ?";
   dataBase.query(sql, [req.body.nurse], (err, result) => {
      if (err) return res.json({"message":"Server error getting matching appointments"})
      console.log("Fetching matching appointments...\n");
      return res.json(result);
   })
});

app.post('/delete_appointments_patients', (req, res) => {
   console.log(`\n\nUser ssn: ${req.body[0]}`);
   const sql = "DELETE FROM vaccine_scheduling WHERE `patient_id` = ? AND `time_slot` = ?";
   dataBase.query(sql, [req.body[0], req.body[1]], (err, result) => {
      if (err) return res.json({"message":"Server error Deleting matching appointments"})
      console.log("Deleting matching appointments...\n");
      return res.json(result);
   })
});

app.post('/delete_appointments_nurses', (req, res) => {
   console.log(`\n\nUser employee_id: ${req.body[0]}`);
   const sql = "DELETE FROM vaccine_scheduling WHERE `nurse_id` = ? AND `time_slot` = ?";
   dataBase.query(sql, [req.body[0], req.body[1]], (err, result) => {
      if (err) return res.json({"message":"Server error Deleting matching appointments"})
      console.log("Deleting matching appointments...\n");
      return res.json(result);
   });
});

app.post('/add_vaccine_record', (req, res) => {
   const nurseId = req.body[0];
   const patientId = req.body[2];
   const timeSlot = req.body[1];
   console.log("INSIDE ADD_VAX_RECORD");
   
   const getVaccine = "SELECT vaccine FROM vaccine_scheduling WHERE `nurse_id` = ? AND `time_slot` = ? AND `patient_id`=?";
   const insertRecord = "INSERT INTO vaccine_record (`dose_num`,`nurse_id`, `patient_id`, `vaccine`, `vac_time`) VALUES (?,?,?,?,?)";
   const getOnHoldValue = "SELECT `on_hold` FROM vaccine WHERE `name`=?";
   const decrementOnHold = "UPDATE vaccine SET `on_hold`=? WHERE `name`=?";
   
   // This query will fetch the associated vaccine
   dataBase.query(getVaccine, [nurseId, timeSlot, patientId], (err, result) => {
      if (err) return res.json({"message":"Server error adding vaccine record..."});
      
      const vaccine = result[0].vaccine;
      console.log(vaccine);

      // This query will insert the vaccine record
      dataBase.query(insertRecord, [1, nurseId, patientId, vaccine,  timeSlot ], (err, result) => {

         if (err)
            return res.json("Something unexpected has occurred");

         console.log("Adding vaccine record...");
         return res.json("Vaccine record added successfully");
      });
      
      // This query will get the 'on_hold' value for a given vaccine
      dataBase.query(getOnHoldValue, [vaccine], (error, result) => {
         let onHold = result[0].on_hold;

         // Condition to avoid negative vaccine inventory
         if (onHold > 0) {
            // This query will update the repository, decrementing 'on_hold' value
            dataBase.query(decrementOnHold, [onHold - 1, vaccine], (err, res) => {
               if (err) {res.json("Failed to decrement 'on_hold' value...")}

               console.log("Decrementing on hold value...");
               // return res.json("Decremented on hold value correctly...");
            });
         }

         
         
      });
      
   });
});

// This query will fetch the specified patient's vaccine record
app.get('/get_vaccine_record/:id', (req, res) => {
   const id = req.params.id;
   const getRecord = "SELECT * FROM vaccine_record WHERE `patient_id`=?";

   dataBase.query(getRecord, [id], (err, result) => {
      if (err) return res.json({"message":"Server error getting schedule"})

      console.log("Fetching patient vaccine record...\n");
      return res.json(result);
   });


});

app.post('/patient_vaccine_record', (req, res) => {
   const id = req.body.id;
   console.log("GETTING RECORD:", id);
   const getRecord = "SELECT * FROM vaccine_record WHERE `patient_id`=?";

   dataBase.query(getRecord, [id], (err, result) => {
      if (err) return res.json({"message":"Server error getting schedule"})

      console.log("Fetching patient vaccine record...\n");
      return res.json(result);
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