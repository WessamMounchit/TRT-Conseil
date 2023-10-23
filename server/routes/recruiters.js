const { Router } = require("express");
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const router = Router();
const passport = require("passport");
const { createJobOffer } = require("../controllers/recruiter");
const { recruiterValidation } = require("../validators/recruiter");

router.post(
  "/create-job-offer",
  passport.authenticate("jwt", { session: false }),
  recruiterValidation,
  validationMiddleware,
  createJobOffer
);

module.exports = router;
