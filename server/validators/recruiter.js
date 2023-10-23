const { check } = require("express-validator");
const db = require("../db");

//ROLE VALIDATION
const roleValidation = check("role").custom(async (value, { req }) => {
  const recruiterRole = req.user.role;

  if (recruiterRole !== 3) {
    throw new Error("Permission refusée");
  }
});

module.exports = {
  recruiterValidation: [roleValidation],
};
