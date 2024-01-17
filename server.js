//IMPORTING LIBRARIES
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
//IMPORTING LIBRARIES

const app = express(); //Creating an Instance called 'app'.

//Enabling cors,express,bodyParser.
app.use(cors());
app.use(express.json());
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
