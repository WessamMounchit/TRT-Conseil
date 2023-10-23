const { Router } = require("express");
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const router = Router();
const passport = require("passport");
const { adminValidation } = require("../validators/admin");
const { consultantRegistration } = require("../controllers/admin");

router.post(
  "/create-consultant",
  passport.authenticate("jwt", { session: false }),
  adminValidation,
  validationMiddleware,
  consultantRegistration
);

module.exports = router;
