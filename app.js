const express = require("express");
const app = express();
const mysql = require("mysql");
const { connection } = require("./mysql/connection");

const questions = require("./routes/questions");
const students = require("./routes/students");
const result = require("./routes/result");

connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySql connected successfully...");
  }
});

app.use(express.json());
app.use("/questions", questions);
app.use("/students", students);
app.use("/result", result);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
