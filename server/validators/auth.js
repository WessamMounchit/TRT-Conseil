const { check } = require("express-validator");
const db = require("../db");
const { compare } = require("bcryptjs");

//EMAIL
const email = check("email")
  .isEmail()
  .withMessage("Veuillez fournir un email valide");

//PASSWORD
const password = check("password")
  .isLength({ min: 10 })
  .withMessage("Le mot de passe doit contenir au moins 10 caractères")
  .matches(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).*$/)
  .withMessage(
    "Le mot de passe doit contenir au moins une majuscule, un caractère spécial et un chiffre"
  );

//IF EMAIL EXIST
const emailExists = check("email").custom(async (value) => {
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    value,
  ]);

  if (rows.length) {
    throw new Error("Cet email existe déjà.");
  }
});

//ROLE VALIDATION
const roleValidation = check("role").custom(async (value, { req }) => {
  if (req.body.role) {
    const result = await db.query("SELECT id FROM roles WHERE id = $1", [
      value,
    ]);

    if (result.rows.length === 0) {
      throw new Error("Rôle non valide.");
    } else if (req.body.role === 1 || req.body.role === 2) {
      throw new Error("Action non autorisée.");
    }
  } else {
    throw new Error("Rôle non fourni.");
  }
});

//LOGIN VALIDATION
const loginFieldsCheck = check("email").custom(async (value, { req }) => {
  const user = await db.query("SELECT * FROM users WHERE email = $1", [value]);

  if (!user.rows.length) {
    throw new Error("Cet email n'existe pas");
  }

  const validPassword = await compare(req.body.password, user.rows[0].password);

  if (!validPassword) {
    throw new Error("Mot de passe incorrect");
  }

  req.user = user.rows[0];
});

module.exports = {
  registerValidation: [email, password, emailExists, roleValidation],
  loginValidation: [loginFieldsCheck],
};
