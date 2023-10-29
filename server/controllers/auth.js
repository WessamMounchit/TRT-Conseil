const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.register = async (req, res) => {
  const { email, role, password } = req.body;

  try {
    const hashedPassword = await hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (email, role_id, password) VALUES ($1, $2, $3) RETURNING id",
      [email, role, hashedPassword]
    );

    const id = result.rows[0].id;
    if (role === 3) {
      await db.query("INSERT INTO recruiters (user_id) VALUES ($1)", [id]);
    } else if (role === 4) {
      await db.query("INSERT INTO candidates (user_id) VALUES ($1)", [id]);
    }

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
    role: user.role_id,
  };

  try {
    const token = sign(payload, SECRET, { expiresIn: '2h' });

    return res.status(200).json({
      success: true,
      message: "Connexion réalisée avec succès",
      role: user.role_id,
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
