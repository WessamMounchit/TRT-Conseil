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
const checkIfCandidateActive = async (req, res, next) => {
  const { accountId } = req.params;

  try {
    const query = "SELECT is_active FROM candidates WHERE user_id = $1";
    const values = [accountId];
    const result = await db.query(query, values);

    if (result.rows[0].is_active === true) {
      return res.status(500).json({ error: "Ce compte candidat est déjà activé" });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "La vérification du compte candidat a échoué" });
  }
};

const checkIfRecruiterActive = async (req, res, next) => {
  const { accountId } = req.params;

  try {
    const query = "SELECT is_active FROM recruiters WHERE user_id = $1";
    const values = [accountId];
    const result = await db.query(query, values);

    if (result.rows[0].is_active === true) {
      return res.status(500).json({ error: "Ce compte recruteur est déjà activé" });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "La vérification du compte recruteur a échoué" });
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

//CHECK IF APPLICATION ALREADY APPROVED
const checkIfApplicationApproved = async (req, res, next) => {
  const { applicationId } = req.params;

  try {
    const query = "SELECT is_valid FROM applications WHERE id = $1";
    const values = [applicationId];
    const result = await db.query(query, values);

    if (result.rows[0].is_valid === true) {
      return res.status(500).json({ error: "Cette candidature est déjà validée" });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "La vérification de la candidature a échoué" });
  }
};

module.exports = {
  roleValidationConsultant,
  approveCandidatAccountValidation: [roleValidationConsultant, checkIfCandidateActive],
  approveRecruiterAccountValidation: [roleValidationConsultant, checkIfRecruiterActive],
  approveApplicationValidation: [roleValidationConsultant, checkIfApplicationApproved],
  JobPostingValidation: [roleValidationConsultant, checkIfJobOfferApprouved],
};
