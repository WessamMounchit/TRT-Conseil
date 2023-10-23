const db = require("../db");
const { hash } = require("bcryptjs");

exports.consultantRegistration = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (email, role_id, password) VALUES ($1, $2, $3)",
      [email, 2, hashedPassword]
    );

    return res.status(201).json({
      success: true,
      message: "Consultant inscrit avec succès",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Erreur interne du serveur.",
    });
  }
};
