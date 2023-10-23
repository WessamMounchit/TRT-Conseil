const { check } = require("express-validator");
const db = require("../db");

//ROLE VALIDATION
const roleValidationAdmin = check("role").custom(async (value, { req }) => {
  const recruiterRole = req.user.role;

  if (recruiterRole !== 1) {
    throw new Error("Permission refusée");
  }
});

module.exports = {
  adminValidation: [roleValidationAdmin],
};
