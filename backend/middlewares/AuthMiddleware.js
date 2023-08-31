/* const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {

  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "important");

    if (validToken) {

      req.user = validToken.nic;
      return next();

    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken }; */


const jwt = require('jsonwebtoken');
//const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {

  const accessToken = req.header("Authorization");

  console.log("token", accessToken);

  if (!accessToken) {
    return res.status(401).json({ error: "User not logged in!" });
  }

  try {
    const validToken = jwt.verify(accessToken, "important");
    if (validToken) {
      req.user = validToken.nic;
      console.log("User logged in");
      next();
    }
  } catch (err) {
    console.error("Error validating token:", err);
    return res.status(500).json({
      error: "Invalid token or internal server error",
      stack: err.stack,
    });
  }
};

module.exports = { validateToken };


