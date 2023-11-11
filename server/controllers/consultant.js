const db = require("../db");
const path = require("path");
const { sendApprovalEmail } = require("../services/nodemailer");
const { TRT_EMAIL } = require("../constants");
const fs = require("fs");

exports.approveCandidateAccount = async (req, res) => {
  const { accountId } = req.params;

  try {
    const query = "UPDATE candidates SET is_active = $1 WHERE user_id = $2";
    const values = [true, accountId];
    await db.query(query, values);

    return res
      .status(200)
      .json({ message: "Compte candidat approuvé avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'approbation du compte candidat" });
  }
};

exports.approveRecruiterAccount = async (req, res) => {
  const { accountId } = req.params;

  try {
    const query = "UPDATE recruiters SET is_active = $1 WHERE user_id = $2";
    const values = [true, accountId];
    await db.query(query, values);

    return res
      .status(200)
      .json({ message: "Compte recruteur approuvé avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'approbation du compte recruteur" });
  }
};

exports.desactivateCandidateAccount = async (req, res) => {
  const { accountId } = req.params;

  try {
    const query = "UPDATE candidates SET is_active = $1 WHERE user_id = $2";
    const values = [false, accountId];
    await db.query(query, values);

    return res
      .status(200)
      .json({ message: "Compte candidat désactivé avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la désactivation du compte candidat" });
  }
};

exports.desactivateRecruiterAccount = async (req, res) => {
  const { accountId } = req.params;

  try {
    const query = "UPDATE recruiters SET is_active = $1 WHERE user_id = $2";
    const values = [false, accountId];
    await db.query(query, values);

    return res
      .status(200)
      .json({ message: "Compte recruteur désactivé avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la désactivation du compte recruteur" });
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

exports.unapproveJobOffer = async (req, res) => {
  const { jobId } = req.params;
  const consultantId = req.user.id;

  try {
    const query =
      "UPDATE job_postings SET is_valid = $1, consultant_id = $2 WHERE id = $3";
    const values = [false, consultantId, jobId];
    await db.query(query, values);

    return res
      .status(200)
      .json({ message: "Annonce désapprouvée avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la désapprobation de l'annonce" });
  }
};

exports.unapproveApplication = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const query =
      "UPDATE applications SET is_valid = $1, consultant_id = $2 WHERE id = $3";
    const values = [false, null, applicationId];
    await db.query(query, values);

    return res
      .status(200)
      .json({ message: "Candidature désapprouvée avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la désapprobation de la candidature" });
  }
};

exports.approveApplication = async (req, res) => {
  const { applicationId } = req.params;
  const consultantId = req.user.id;

  try {
    const updateQuery =
      "UPDATE applications SET is_valid = $1, consultant_id = $2 WHERE id = $3";

    const updateValues = [true, consultantId, applicationId];
    await db.query(updateQuery, updateValues);

    const selectQuery = `
    SELECT c.first_name, c.last_name, c.cv, u.email
    FROM candidates c
    JOIN applications a ON a.candidate_id = c.user_id
    JOIN job_postings j ON a.job_posting_id = j.id
    JOIN users u ON j.recruiter_id = u.id
    WHERE a.id = $1`;

    const selectValues = [applicationId];
    const result = await db.query(selectQuery, selectValues);
    const { first_name, last_name, cv, email } = result.rows[0];

    sendApprovalEmail(/* email */ TRT_EMAIL, first_name, last_name, cv);

    return res
      .status(200)
      .json({ message: "Candidature approuvée et e-mail envoyé avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'approbation de la candidature" });
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const query = `
      SELECT
        u.id,
        u.email,
        c.is_active,
        c.first_name,
        c.last_name
      FROM users u
      INNER JOIN candidates c ON u.id = c.user_id
    `;

    const result = await db.query(query);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la sélection des candidats" });
  }
};

exports.getRecruiters = async (req, res) => {
  try {
    const query = `
      SELECT
        u.id,
        u.email,
        r.is_active,
        r.company_name
      FROM users u
      INNER JOIN recruiters r ON u.id = r.user_id
    `;

    const result = await db.query(query);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la sélection des recruteurs" });
  }
};

exports.getJobPostings = async (req, res) => {
  try {
    const query =
      "SELECT id, recruiter_id, job_title, work_location, description, is_valid FROM job_postings";
    const result = await db.query(query);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la sélection des annonces" });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const query = "SELECT * FROM applications";
    const result = await db.query(query);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la sélection des candidatures" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { accountId } = req.params;
    const result = await db.query(
      "SELECT cv FROM candidates WHERE user_id = $1",
      [accountId]
    );
    if (result.rows.length > 0) {
      const { cv } = result.rows[0];

      try {
        fs.unlink(cv);
        console.log(`Le CV (${cv}) a été supprimé.`);
      } catch (error) {
        console.error(`Erreur lors de la suppression du CV (${cv}):`, error);
      }
    }

    const query = "DELETE FROM users WHERE id = $1";
    const values = [accountId];
    await db.query(query, values);

    return res
      .status(200)
      .json({ message: "L'utilisateur a bien été supprimé." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur." });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const query = "DELETE FROM job_postings WHERE id = $1";
    const values = [jobId];
    await db.query(query, values);

    return res.status(200).json({ message: "L'annonce a bien été supprimée." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'annonce." });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const query = "DELETE FROM applications WHERE id = $1";
    const values = [applicationId];
    await db.query(query, values);

    return res
      .status(200)
      .json({ message: "La candidature a bien été supprimée." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la candidature." });
  }
};
