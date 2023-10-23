const db = require("../db");

exports.approveAccount = async (req, res) => {
  const { accountId } = req.params;

  try {
    const query = "UPDATE users SET is_active = $1 WHERE id = $2";
    const values = [true, accountId];
    await db.query(query, values);

    return res.status(200).json({ message: "Compte approuvé avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'approbation du compte" });
  }
};

exports.approveJobOffer = async (req, res) => {
  const { jobId } = req.params;

  try {
    const query = "UPDATE job_postings SET is_valid = $1 WHERE id = $2";
    const values = [true, jobId];
    await db.query(query, values);

    return res.status(200).json({ message: "Annonce approuvée avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'approbation de l'annonce" });
  }
};

exports.approveApplication = async (req, res) => {
  const { candidateId, jobPostingId } = req.params;

  try {
    const query =
      "UPDATE applications SET is_valid = $1 WHERE candidate_id = $2 AND job_posting_id = $3";
    const values = [true, candidateId, jobPostingId];
    await db.query(query, values);

    return res
      .status(200)
      .json({ message: "Candidature approuvée avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'approbation de la candidature" });
  }
};
