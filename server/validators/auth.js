const db = require("../db");
const { compare } = require("bcryptjs");

//EMAIL
function validateEmail(req, res, next) {
  const email = req.body.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).send("Veuillez fournir un email valide");
  }

  next();
}

//PASSWORD
function validatePassword(req, res, next) {
  const password = req.body.password;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).*$/;

  if (!password || password.length < 10 || !passwordRegex.test(password)) {
    return res.status(400).send(
      "Le mot de passe doit contenir au moins une majuscule, un caractère spécial et un chiffre"
    );
  }

  next();
}

//IF EMAIL EXIST
const emailExists = async (req, res, next) => {
  const email = req.body.email;

  try {
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (rows.length) {
      return res.status(500).json({ error: "Cet email existe déjà." });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Une vérification n'as pas pu être faite" });
  }
};

//ROLE VALIDATION
const roleValidation = async (req, res, next) => {
  const role = req.body.role;
  try {
    const result = await db.query("SELECT id FROM roles WHERE id = $1", [role]);

    if (!req.body.role) {
      return res.status(500).json({ error: "Rôle non fourni." });
    }

    if (result.rows.length === 0) {
      return res.status(500).json({ error: "Rôle non valide." });
    } else if (req.body.role === 1 || req.body.role === 2) {
      return res.status(500).json({ error: "Action non autorisée." });
    } else {
      next();
    }
  } catch {
    return res
      .status(500)
      .json({
        error: "Une erreur s'est produite lors de la vérification du rôle",
      });
  }
};

//LOGIN VALIDATION
const loginFieldsCheck = async (req, res, next) => {
  const email = req.body.email;

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!user.rows.length) {
      return res.status(500).json({ error: "Email ou mot de passe incorrect" });
    }

    const validPassword = await compare(
      req.body.password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(500).json({ error: "Email ou mot de passe incorrect" });
    }

    req.user = user.rows[0];
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "La vérification n'as pas pu être faite" });
  }
};

module.exports = {
  registerValidation: [validateEmail, validatePassword, emailExists, roleValidation],
  loginValidation: [loginFieldsCheck],
};
