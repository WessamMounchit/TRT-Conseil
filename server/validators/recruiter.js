const db = require("../db");

//ROLE VALIDATION
const roleValidationRecruiter = async (req, res, next) => {
  const recruiterRole = req.user.role;

  if (recruiterRole !== 3) {
    return res.status(500).json({ error: "Permission refusée" });
  } else {
    next();
  }
};

//RECRUITER ACCOUNT VALIDATION
const checkRecruiterAccountActivation = async (req, res, next) => {
  const recruiterId = req.user.id;
  try {
    const query = "SELECT is_active FROM recruiters WHERE user_id = $1";
    const values = [recruiterId];
    const { rows } = await db.query(query, values);
    const { is_active } = rows[0];

    if (!is_active) {
      return res
        .status(500)
        .json({ error: "Votre compte n'est pas encore activé" });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "La vérification du compte a échoué" });
  }
};

//CHECK IF PROFILE IS ALREADY COMPLETE
const isRecruiterProfileAlreadyComplete = async (req, res, next) => {
  const recruiterId = req.user.id;
  try {
    const query = "SELECT * FROM recruiters WHERE user_id = $1";
    const values = [recruiterId];
    const { rows } = await db.query(query, values);
    const { company_name, address } = rows[0];

    if (company_name || address) {
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

//CHECK IF PROFILE IS COMPLETE
const checkRecruiterProfile = async (req, res, next) => {
  const recruiterId = req.user.id;

  try {
    const query = "SELECT * FROM recruiters WHERE user_id = $1";
    const values = [recruiterId];
    const { rows } = await db.query(query, values);
    const { company_name, address } = rows[0];

    if (!company_name || !address) {
      return res.status(500).json({
        error:
          "Veuillez compléter votre profil avant de poster une offre d'emploi.",
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


module.exports = {
  roleValidationRecruiter,
  recruiterCompleteProfileValidation: [
    roleValidationRecruiter,
    checkRecruiterAccountActivation,
    isRecruiterProfileAlreadyComplete,
  ],
  recruiterCreateJobOfferValidation: [
    roleValidationRecruiter,
    checkRecruiterAccountActivation,
    checkRecruiterProfile,
  ],
};
