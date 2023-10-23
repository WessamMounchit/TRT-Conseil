const db = require("../db");

exports.createJobOffer = async (req, res) => {
  const { jobTitle, workLocation, description } = req.body;
  const recruiter_id = req.user.id;

  try {
    const query =
      "INSERT INTO job_postings (job_title, work_location, description, recruiter_id) VALUES ($1, $2, $3, $4) RETURNING id";
    const values = [jobTitle, workLocation, description, recruiter_id];

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
