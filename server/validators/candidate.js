const { check } = require("express-validator");

//ROLE VALIDATION
const roleValidationCandidate = check("role").custom(async (value, { req }) => {
  const candidateRole = req.user.role;

  if (candidateRole !== 4) {
    throw new Error("Permission refusée");
  }
});

module.exports = {
  candidateValidation: [roleValidationCandidate],
};
