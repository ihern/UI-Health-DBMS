const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 4000;

// app.use(express.json());

var corsOptions = {
   origin: "http://localhost:4000"
 };
 
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send("Hello world!")
});

app.listen(PORT, () => {
   console.log(`Server Running on Port ${PORT}`);
});