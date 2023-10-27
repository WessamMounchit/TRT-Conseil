const { Router } = require("express");
const router = Router();
const passport = require("passport");
const { roleValidationAdmin } = require("../validators/admin");
const { consultantRegistration } = require("../controllers/admin");
const { registerValidation } = require("../validators/auth");

router.post(
  "/create-consultant",
  passport.authenticate("jwt", { session: false }),
  roleValidationAdmin,
  registerValidation,
  consultantRegistration
);

module.exports = router;
