//Command To Run: node server.js

//IMPORTING LIBRARIES
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const bodyParser = require('body-parser');
const mysql = require("mysql2");
//const bycrypt = require("bycrypt");
//const jwt = require("jsonwebtoken");
//IMPORTING LIBRARIES

const app = express(); //Creating an Instance called 'app'.

//Enabling cors,express,bodyParser.
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
//Enabling cors,express,bodyParser.

//Server runs on the Port 4000.
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//Server runs on the Port 4000.

/*TODOLIST APP  */
const tasks = [];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", express.json(), (req, res) => {
  const { text } = req.body;
  const newTask = { id: Date.now(), text };
  tasks.push(newTask);
  console.log(tasks);
  res.json(newTask);
});
/*TODOLIST APP */

/*CONTACTS APP*/
const contact = [];

app.get("/api/contact", (req, res) => {
  res.json(contact);
});

app.post("/api/contact", express.json(), (req, res) => {
  const { name, email, phone } = req.body;
  const newcontact = { name, email, phone };
  contact.push(newcontact);
  console.log(newcontact);
  res.json(newcontact);
});
/*CONTACTS APP */

/*PRODUCTS APP */
const product = [];

app.get("/api/product", (req, res) => {
  res.json(product);
});

app.post("/api/product", express.json(), (req, res) => {
  const { name, price, quantity } = req.body;
  const newproduct = { name, price, quantity };
  contact.push(newproduct);
  console.log(newproduct);
  res.json(newproduct);
});
/*PRODUCTS APP */

/*FILE SYSTEM APP */
const filePath = "message.txt";

app.get("/api/readFile", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    res.json(data);
  } catch (err) {
    console.error("Error reading file:", err);
  }
});

app.post("/api/writeFile", async (req, res) => {
  try {
    await fs.writeFile(filePath, req.body.content, "utf8");
  } catch (err) {
    console.error("Error writing file:", err);
  }
});

app.post("/api/appendFile", async (req, res) => {
  try {
    await fs.appendFile(filePath, req.body.content, "utf8");
  } catch (err) {
    console.error("Error appending to file:", err);
  }
});
/*FILE SYSTEM APP */

/*MYSQL DataBase.*/
const dbtejas = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "knightrider",
  database: "tejas",
});

dbtejas.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.get("/api/getUserData", (req, res) => {
  const selectQuery = "select * from users";
  dbtejas.query(selectQuery, (err, result) => {
    if (err) {
      console.error("Error in fetching data.", err);
      return;
    }
    res.json(result);
  });
});

app.post("/api/createUserData", (req, res) => {
  const { userid, username, useremail, userpassword } = req.body;
  const insertQuery = "insert into users (userid, username, useremail, userpassword) values(?,?,?,?)";
  const values = [userid, username, useremail, userpassword];

  dbtejas.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error in creating user.", err);
      return;
    }
    console.log("Users created successfully.");
    res.json({ message:"User created successfully."});
  })
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email,password);
  const selectQuery = "SELECT * FROM users WHERE useremail = ? AND userpassword = ?";
  const values = [email, password];
  dbtejas.query(selectQuery, values, (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    }

    if (results.length > 0) {
      res.json({ success: true, message: "Login successful!" });
    } else {
      res.json({ success: false, message: "Invalid email or password." });
    }
  });
});
/*MYSQL DataBase.*/