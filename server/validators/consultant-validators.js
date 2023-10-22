const { check } = require("express-validator");
const db = require("../db");

//ROLE VALIDATION
const consultantHasPermission = check("role").custom(async (value, { req }) => {
  const consultantRole = req.user.role;

  if (consultantRole !== 2) {
    throw new Error("Permission refusée");
  }
});

//CHECK IF ACTIVE
const checkIfActive = check("is_active").custom(async (value, { req }) => {
  const accountId = req.params.id;

  const query = "SELECT is_active FROM users WHERE id = $1";
  const values = [accountId];
  const result = await db.query(query, values);

  if (result.rows[0].is_active === true) {
    throw new Error("Ce compte est déjà activé");
  }
});

module.exports = {
  consultantValidation: [consultantHasPermission, checkIfActive],
};
