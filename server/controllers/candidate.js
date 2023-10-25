const db = require("../db");

exports.applyToJob = async (req, res) => {
  const { jobId } = req.params;
  const candidateId = req.user.id;

  try {
    const query =
      "INSERT INTO applications (candidate_id, job_posting_id) VALUES ($1, $2)";
    const values = [candidateId, jobId];

    await db.query(query, values);

    return res.status(201).json({
      message: "Postulation réalisée avec succès",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la postulation" });
  }
};

exports.completeCandidateProfile = async (req, res) => {
  const candidateId = req.user.id;
  const { firstName, lastName } = req.body;
  const cv = req.file.path;

  try {
    const query =
      "UPDATE candidates SET first_name = $1, last_name = $2, cv = $3 WHERE user_id = $4";
    const values = [firstName, lastName, cv, candidateId];

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

exports.getApprouvedJobPostings = async (req, res) => {
  const candidateId = req.user.id;

  try {
    const query = `
    SELECT * FROM job_postings
    WHERE is_valid = true
    AND id NOT IN (
      SELECT job_posting_id FROM applications
      WHERE candidate_id = $1
    )`;
    const values = [candidateId];

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(200).json({
        message: "Pas d'annonces disponible",
      });
    }

    return res.status(200).json({
      message: "Annonces sélectionnés avec succès",
      jobPostings: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la sélection des annonces" });
  }
};

exports.getJobsApplied = async (req, res) => {
  const candidateId = req.user.id;

  try {
    const query = `
    SELECT job_postings.*
    FROM job_postings
    JOIN applications ON job_postings.id = applications.job_posting_id
    WHERE applications.candidate_id = $1`;
    const values = [candidateId];

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(200).json({
        message: "Aucune annonce postulée par ce candidat",
      });
    }

    return res.status(200).json({
      message: "Annonces postulées sélectionnés avec succès",
      jobsApplied: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la sélection des annonces" });
  }
};
