const { Router } = require("express");
const router = Router();
const { roleValidationAdmin } = require("../validators/admin");
const { consultantRegistration } = require("../controllers/admin");
const { registerValidation } = require("../validators/auth");
const { passportAuth } = require("../middlewares/passport-auth");

router.post(
  "/create-consultant",
  passportAuth,
  roleValidationAdmin,
  registerValidation,
  consultantRegistration
);

module.exports = router;
