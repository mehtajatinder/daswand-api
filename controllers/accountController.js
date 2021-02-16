const db = require("../util/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashpwd) => {
      return db.execute("call registerUser(?,?,?,?)", [
        firstname,
        lastname,
        email,
        hashpwd,
      ]);
    })
    .then((data) => {
      if (data[0][0][0].userID == 0) {
        const error = new Error("user not created");
        error.statusCode = 400;
        throw error;
      } else {
        res.status(200).json({
          message: data[0][0][0].message,
        });
      }
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.message = "error occured.";
      }
      res.status(error.statusCode).json({
        message: error.message,
      });
    });
};

exports.login = (req, res, next) => {
  const password = req.body.password;
  db.execute("call loginUser(?)", [req.body.username])
    .then((data) => {
      if (data[0][0][0].userID == 0) {
        const error = new Error("user does not exists");
        error.statusCode = 400;
        throw error;
      } else {
        data.userID = data[0][0][0].userID;
        data.bcryptResult = bcrypt.compareSync(
          password,
          data[0][0][0].userPassword
        );
        return data;
      }
    })
    .then((data) => {
      if (data.bcryptResult == true) {
        const tempToken = jwt.sign({ userID: data.userID }, "daswands", {
          expiresIn: "1h",
        });
        res.status(200).json({
          token: tempToken,
          userId: data.userID,
          message: "user logged in",
        });
      } else {
        const error = new Error("incorrect username/password.");
        error.statusCode = 400;
        throw error;
      }
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.message = "error occured";
      }
      res.status(error.statusCode).json({
        message: error.message,
      });
    });
};
