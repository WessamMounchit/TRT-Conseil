const { check } = require("express-validator");
const db = require("../db");

//ROLE VALIDATION
const roleValidationConsultant = check("role").custom(
  async (value, { req }) => {
    const consultantRole = req.user.role;

    if (consultantRole !== 2) {
      throw new Error("Permission refusée");
    }
  }
);

//CHECK IF ACTIVE
const checkIfActive = check("is_active").custom(async (value, { req }) => {
  if (req.params.accountId) {
    const { accountId } = req.params;
    const query = "SELECT is_active FROM users WHERE id = $1";
    const values = [accountId];
    const result = await db.query(query, values);

    if (result.rows[0].is_active === true) {
      throw new Error("Ce compte est déjà activé");
    }
  }
});

//CHECK IF JOB OFFER
const checkIfJobOfferApprouved = check("is_valid").custom(
  async (value, { req }) => {
    if (req.params.jobId) {
      const { jobId } = req.params;

      const query = "SELECT is_valid FROM job_postings WHERE id = $1";
      const values = [jobId];
      const result = await db.query(query, values);

      if (result.rows[0].is_valid === true) {
        throw new Error("Cette annonce est déjà validée");
      }
    }
  }
);

module.exports = {
  consultantValidation: [
    roleValidationConsultant,
    checkIfActive,
    checkIfJobOfferApprouved,
  ],
};
