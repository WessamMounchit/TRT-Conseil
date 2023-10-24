const db = require("../db");
const path = require("path");
const { sendApprovalEmail } = require("../services/nodemailer");

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
  const consultantId = req.user.id;

  try {
    const query =
      "UPDATE job_postings SET is_valid = $1, consultant_id = $2 WHERE id = $3";
    const values = [true, consultantId, jobId];
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
  const { candidateId, jobId } = req.params;
  const consultantId = req.user.id;

  try {
    const updateQuery =
      "UPDATE applications SET is_valid = $1, consultant_id = $2 WHERE candidate_id = $3 AND job_posting_id = $4";

    const updateValues = [true, consultantId, candidateId, jobId];
    await db.query(updateQuery, updateValues);

    const selectQuery = `
    SELECT c.first_name, c.last_name, c.cv, u.email
    FROM candidates c
    JOIN applications a ON a.candidate_id = c.user_id
    JOIN job_postings j ON a.job_posting_id = j.id
    JOIN users u ON j.recruiter_id = u.id
    WHERE a.candidate_id = $1 AND a.job_posting_id = $2`;

    const selectValues = [candidateId, jobId];
    const result = await db.query(selectQuery, selectValues);
    const { first_name, last_name, cv, email } = result.rows[0];

    sendApprovalEmail(email, first_name, last_name, cv);

    return res
      .status(200)
      .json({ message: "Candidature approuvée et mail envoyé avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'approbation de la candidature" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const result = await db.query(query);

    return res.status(200).json({
      message: "Utilisateurs sélectionnés avec succès",
      users: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la sélection des utilisateurs" });
  }
};

exports.getJobPostings = async (req, res) => {
  try {
    const query = "SELECT * FROM job_postings";
    const result = await db.query(query);

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
