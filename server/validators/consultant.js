const db = require("../db");

//ROLE VALIDATION
const roleValidationConsultant = async (req, res, next) => {
  const consultantRole = req.user.role;

  if (consultantRole !== 2) {
    return res.status(500).json({ error: "Permission refusée" });
  } else {
    next();
  }
};

//CHECK IF ACTIVE
const checkIfActive = async (req, res, next) => {
  const { accountId } = req.params;

  try {
    const query = "SELECT is_active FROM users WHERE id = $1";
    const values = [accountId];
    const result = await db.query(query, values);

    if (result.rows[0].is_active === true) {
      return res.status(500).json({ error: "Ce compte est déjà activé" });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "La vérification du compte a échoué" });
  }
};

//CHECK IF JOB OFFER
const checkIfJobOfferApprouved = async (req, res, next) => {
  const { jobId } = req.params;

  try {
    const query = "SELECT is_valid FROM job_postings WHERE id = $1";
    const values = [jobId];
    const result = await db.query(query, values);

    if (result.rows[0].is_valid === true) {
      return res.status(500).json({ error: "Cette annonce est déjà validée" });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "La vérification de l'annonce a échoué" });
  }
};

module.exports = {
  roleValidationConsultant,
  approuveAccountValidation: [roleValidationConsultant, checkIfActive],
  JobPostingValidation: [roleValidationConsultant, checkIfJobOfferApprouved],
  consultantValidation: [
    roleValidationConsultant,
    checkIfActive,
    checkIfJobOfferApprouved,
  ],
};
