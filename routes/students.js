const express = require("express");
const router = express.Router();
const { connection } = require("../mysql/connection");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middleware/VerifyToken");

router.post("/login", (req, res, next) => {
  const table_name = "student";
  connection.query(
    `SELECT * FROM ${table_name}  WHERE Contact='${req.body.Contact}' AND Mac='${req.body.Mac}'`,
    (error, data, fields) => {
      if (error) {
        console.log("There is error in the query!");
        res.status(401);
      }
      if (data.length > 0) {
        console.log("Query executed successfully");
        // console.log(data);
        const username = data[0].Name;
        const token = jwt.sign({ name: username }, "secretkey");
        const a = jwt.verify(token, "secretkey");
        console.log(a);
        res
          .status(200)
          .header("jwt_auth_token", token)
          .header("name", req.name);
        res.send({ token, username });
      } else {
        res.send("Invalid Credentials").status(401);
      }
    }
  );
});

router.post("/loguser", (req, res, next) => {
  const table_name = "logged_in_user";
  connection.query(
    `INSERT INTO ${table_name}(Contact) VALUES('${req.body.Mac}')`,
    (error, data, fields) => {
      if (error) {
        res.send("failed");
        console.log(error);
      }
      console.log("Query executed successfully");
      res.send(req.body.Contact);
    }
  );
});

router.post("/checkuser", (req, res, next) => {
  const table_name = "logged_in_user";
  connection.query(
    `SELECT * FROM ${table_name} WHERE Contact=${req.body.Contact}`,
    (error, data, fields) => {
      if (error) {
        res.send("Error in Query");
        console.log(error);
      }
      if (data && data.length > 0) {
        res.status(200).send(true);
        console.log(data);
      } else {
        res.status(200).send(false);
      }
    }
  );
});

module.exports = router;
