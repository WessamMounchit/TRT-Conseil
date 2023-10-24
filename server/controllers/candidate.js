const db = require("../db");

exports.applyToJob = async (req, res) => {
  const { candidateId, jobId } = req.params;

  try {
    const query =
      "INSERT INTO applications (candidate_id, job_posting_id) VALUES ($1, $2)";
    const values = [candidateId, jobId];

    await db.query(query, values);

    return res.status(201).json({
      message: "Postulation réalisée avec succès",
      jobId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la postulation" });
  }
};

exports.completeCandidateProfile = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName } = req.body;
  const cv = req.file.path;

  try {
    const query =
      "UPDATE candidates SET first_name = $1, last_name = $2, cv = $3 WHERE user_id = $4";
    const values = [firstName, lastName, cv, userId];

    await db.query(query, values);

    return res.status(201).json({
      message: "profil complété avec succès",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la complétion du profil" });
  }
};
