const { Router } = require("express");
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const router = Router();
const passport = require("passport");
const { candidateValidation } = require("../validators/candidate");
const { applyToJob } = require("../controllers/candidate");

router.post(
  "/application",
  passport.authenticate("jwt", { session: false }),
  candidateValidation,
  validationMiddleware,
  applyToJob
);

module.exports = router;
