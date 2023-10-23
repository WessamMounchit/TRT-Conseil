const db = require("../db");

exports.applyToJob = async (req, res) => {
  const { candidateId, jobId } = req.body;

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
    return res
      .status(500)
      .json({ error: "Erreur lors de la postulation" });
  }
};
