const db = require("../db");

exports.createJobOffer = async (req, res) => {
  const { jobTitle, workLocation, description } = req.body;
  const recruiterId = req.user.id;

  try {
    const query =
      "INSERT INTO job_postings (job_title, work_location, description, recruiter_id) VALUES ($1, $2, $3, $4) RETURNING id";
    const values = [jobTitle, workLocation, description, recruiterId];

    const result = await db.query(query, values);

    const jobId = result.rows[0].id;

    return res.status(201).json({
      message: "Annonce d'emploi créée avec succès",
      jobId,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la création de l'annonce d'emploi" });
  }
};

exports.completeRecruiterProfile = async (req, res) => {
  const recruiterId = req.user.id;
  const { companyName, address } = req.body;

  try {
    const query =
      "UPDATE recruiters SET company_name = $1, address = $2 WHERE user_id = $3";
    const values = [companyName, address, recruiterId];

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

exports.getActiveCandidatesApplying = async (req, res) => {
  const { jobId } = req.params;

  try {
    const query = `
      SELECT c.*
      FROM candidates c
      JOIN users u ON c.user_id = u.id
      JOIN applications a ON c.user_id = a.candidate_id
      WHERE u.is_active = true AND a.job_posting_id = $1`;

    const values = [jobId];
    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(200).json({
        message: "Aucun candidat n'a postulé à cette annonce",
      });
    }

    return res.status(200).json({
      message: "Candidats sélectionnés avec succès",
      candidates: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la sélection des candidats" });
  }
};

exports.getRecruiterJobPostings = async (req, res) => {
  const recruiterId = req.user.id;

  try {
    const query = `
    SELECT job_postings.*
    FROM job_postings
    WHERE job_postings.recruiter_id = $1`;

    const values = [recruiterId];
    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(200).json({
        message: "Aucune annonce postée par ce recruteur",
      });
    }

    return res.status(200).json({
      message: "Annonces du recruteur sélectionnées avec succès",
      jobPostings: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la sélection des annonces" });
  }
};
