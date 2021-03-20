const express = require("express");
const router = express.Router();
const { connection } = require("../mysql/connection");
const verifyToken = require("../Middleware/VerifyToken");

var moment = require("moment");

router.get("/set/:setId", (req, res, next) => {
  const table_name = "question";
  connection.query(
    `SELECT * FROM ${table_name} WHERE Setname = ${req.params.setId}`,
    (error, data, fields) => {
      if (error) {
        res.status(400).send("Not Found");
        console.log("There is error in the query!", error);
      } else if (data.length < 1) {
        res.status(400).send("No Question Found");
      } else {
        console.log("Query executed successfylly");
        res.json(data);
      }
    }
  );
});

router.get("/live", (req, res, next) => {
  const table_name = "ques";
  connection.query(`SELECT * FROM ${table_name}`, (error, data, fields) => {
    if (error) {
      res.status(400).send("Not Found");
      console.log("There is error in the query!", error);
    } else {
      console.log("Query executed successfylly");
      res.json(data);
    }
  });
});

router.get("/checktime", (req, res, next) => {
  const table_name = "exam_time";
  connection.query(`SELECT * FROM ${table_name}`, (error, data, fields) => {
    if (error) {
      res.status(400).send("Not Found");
      console.log("There is error in the query", error);
    } else {
      console.log("Query executed successfylly");
      res.json(data);
      // res.send({ get_data, now_date });
      // res.send("Failed");
    }
  });
});

module.exports = router;
