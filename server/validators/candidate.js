const db = require("../db");

//ROLE VALIDATION
const roleValidationCandidate = async (req, res, next) => {
  const candidateRole = req.user.role;

  if (candidateRole !== 4) {
    return res.status(500).json({ error: "Permission refusée" });
  }
  next();
};

//ACCOUNT VALIDATION
const checkAccountActivation = async (req, res, next) => {
  const candidateId = req.user.id;
  try {
    const query = "SELECT is_active FROM candidates WHERE user_id = $1";
    const values = [candidateId];
    const { rows } = await db.query(query, values);
    const { is_active } = rows[0];

    if (!is_active) {
      return res
        .status(500)
        .json({ error: "Votre compte n'est pas encore activé" });
    } else {
      req.isActive = is_active;
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "La vérification du compte a échoué" });
  }
};

//CHECK IF PROFILE IS COMPLETE
const checkCandidateProfile = async (req, res, next) => {
  const candidateId = req.user.id;

  try {
    const query = "SELECT * FROM candidates WHERE user_id = $1";
    const values = [candidateId];
    const { rows } = await db.query(query, values);
    const { first_name, last_name, cv } = rows[0];

    if (!first_name || !last_name || !cv) {
      return res.status(500).json({
        error:
          "Veuillez compléter votre profil avant de postuler à une offre d'emploi.",
      });
    } else {
      next()
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "La vérification du profil a échoué" });
  }
};

//CHECK IF PROFILE IS ALREADY COMPLETE
const checkIfCandidateProfileComplete = async (req, res, next) => {
  const candidateId = req.user.id;
  try {
    const query = "SELECT * FROM candidates WHERE user_id = $1";
    const values = [candidateId];
    const { rows } = await db.query(query, values);
    const { first_name, last_name, cv } = rows[0];

    if (first_name || last_name || cv) {
      return res
        .status(500)
        .json({ error: "Votre profil a déjà été complété." });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "La vérification du profil a échoué" });
  }
};

//CHECK IF CANDIDATE ALREADY APPLIED
const checkIfCandidateAlreadyApplied = async (req, res, next) => {
  const { jobId } = req.params;
  const candidateId = req.user.id;
  try {
    const query = `
          SELECT *
          FROM applications
          WHERE candidate_id = $1 AND job_posting_id = $2`;

    const values = [candidateId, jobId];

    const result = await db.query(query, values);

    if (result.rows.length > 0) {
      return res
        .status(500)
        .json({ error: "Vous avez déjà postulé à cette offre." });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "La vérification de la postulation a échoué" });
  }
};

module.exports = {
  roleValidationCandidate,
  checkAccountActivation,
  completeProfileValidation: [
    roleValidationCandidate,
    checkAccountActivation,
    checkIfCandidateProfileComplete,
  ],
  applicationValidation: [
    roleValidationCandidate,
    checkAccountActivation,
    checkCandidateProfile,
    checkIfCandidateAlreadyApplied,
  ],
};
