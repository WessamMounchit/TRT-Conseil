const db = require("../db");

//ROLE VALIDATION
exports.roleValidationAdmin = async (req, res, next) => {
  const recruiterRole = req.user.role;

  if (recruiterRole !== 1) {
    return res.status(500).json({ error: "Permission refusée" });
  } else {
    next();
  }
};