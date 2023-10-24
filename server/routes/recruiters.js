const { Router } = require("express");
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const router = Router();
const passport = require("passport");
const { createJobOffer, completeRecruiterProfile, getActiveCandidatesApplying } = require("../controllers/recruiter");
const { recruiterValidation } = require("../validators/recruiter");

router.post(
  "/create-job-offer",
  passport.authenticate("jwt", { session: false }),
  recruiterValidation,
  validationMiddleware,
  createJobOffer
);

router.post(
  "/complete-profile/:userId",
  passport.authenticate("jwt", { session: false }),
  recruiterValidation,
  validationMiddleware,
  completeRecruiterProfile
);

router.get(
  "/get-candidates/:jobId",
  passport.authenticate("jwt", { session: false }),
  recruiterValidation,
  validationMiddleware,
  getActiveCandidatesApplying
);


module.exports = router;
