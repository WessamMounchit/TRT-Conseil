const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.register = async (req, res) => {
  const { email, role, password } = req.body;

  try {
    const hashedPassword = await hash(password, 10);

    await db.query(
      "INSERT INTO users(email, role_id, password) VALUES ($1, $2, $3)",
      [email, role, hashedPassword]
    );

    return res.status(201).json({
      success: true,
      message: "Inscription réalisée avec succès",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Erreur interne du serveur.",
    });
  }
};

exports.login = async (req, res) => {
  let user = req.user;

  let payload = {
    id: user.id,
    email: user.email,
  };

  let role = null;

  try {
    const result = await db.query("select name from roles where id = $1", [
      user.role_id,
    ]);
    role = result.rows[0];
  } catch (error) {
    console.error(error.message);
  }

  try {
    const token = await sign(payload, SECRET);

    return res.status(200).json({
      success: true,
      info: "Connexion réalisée avec succès",
      role: role.name,
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
