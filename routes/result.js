const express = require("express");
const router = express.Router();
const { connection } = require("../mysql/connection");
const verifyToken = require("../Middleware/VerifyToken");

router.post("/", (req, res, next) => {
  const table_name = "live_exam_result";
  connection.query(
    `INSERT INTO ${table_name}(Name,Full_mark, Obtained_mark) VALUES('${req.body.Name}','${req.body.Full_mark}', '${req.body.Obtained_mark}')`,
    (error, data, fields) => {
      if (error) {
        res.status(400).send("Failed");
        console.log("There is error in the query!", error);
      } else {
        console.log("Query executed successfylly");
        res.json(data);
      }
    }
  );
});

module.exports = router;
