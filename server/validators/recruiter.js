const { check } = require("express-validator");

//ROLE VALIDATION
const roleValidationRecruiter = check("role").custom(async (value, { req }) => {
  const recruiterRole = req.user.role;

  if (recruiterRole !== 3) {
    throw new Error("Permission refusée");
  }
});

module.exports = {
  recruiterValidation: [roleValidationRecruiter],
};
