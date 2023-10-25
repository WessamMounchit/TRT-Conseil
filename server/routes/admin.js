const { Router } = require("express");
const router = Router();
const passport = require("passport");
const { roleValidationAdmin } = require("../validators/admin");
const { consultantRegistration } = require("../controllers/admin");

router.post(
  "/create-consultant",
  passport.authenticate("jwt", { session: false }),
  roleValidationAdmin,
  consultantRegistration
);

module.exports = router;
