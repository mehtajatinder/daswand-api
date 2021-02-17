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
        res.status(400).json({
          // token: tempToken,
          message: data[0][0][0].message,
        });
      } else {
        const tempToken = jwt.sign(
          { userID: data[0][0][0].userID },
          "daswands",
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          token: tempToken,
          message: data[0][0][0].message,
        });
      }
    })
    .catch((err) => {
      console.log(1);
      console.log(err);
    });

  // db.execute("call registerUser(?,?,?,?)", [
  //   firstname,
  //   lastname,
  //   email,
  //   password,
  // ])
  //   .then((data) => {
  //     //  console.log(data)
  //     if (data[0][0][0].userID == 0) {
  //       res.status(400).json({
  //         token: tempToken,
  //         message: data[0][0][0].message,
  //       });
  //     } else {
  //       const tempToken = jwt.sign(
  //         { userID: data[0][0][0].userID },
  //         "daswand",
  //         {
  //           expiresIn: "1h",
  //         }
  //       );
  //       res.status(200).json({
  //         token: tempToken,
  //         message: data[0][0][0].message,
  //       });
  //     }
  //   })
  //   .catch((error) => {
  //     res.status(500).json({
  //       error: error,
  //     });
  //   });
};

exports.login = (req, res, next) => {
  db.execute("call loginUser(?,?)", [req.body.username, req.body.password])
    .then((data) => {
      if (data[0][0][0].userID == 0) {
        // bcrypt.compare(req.body.password,).then
        res.status(400).json({
          // token: tempToken,
          message: "inavlid username password.",
          data: data
        });
      } else {
        res.status(200).json({
          //data:data,
          message: "user logged in.",
        });
      }
      
    })
    .catch((error) => {
      res.status(500).json({
        message: "invalid username password",
      });
    });
};
