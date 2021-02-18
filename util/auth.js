const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("auth");
  if (!authHeader) {
    const err = new Error("not authenticated");
    err.ststuscode = 401;
    throw error;
  }

  const token = req.get("token");
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "daswands");
  } catch (err) {
    err.ststuscode = 500;
    throw error;
  }

  if (!decodedToken) {
    const err = new Error("not authenticated");
    err.ststuscode = 500;
    throw error;
  }
  req.userID = decodedToken.userID;
  next();
};
