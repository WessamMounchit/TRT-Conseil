const { Router } = require("express");
const router = Router();
const passport = require("passport");
const { createJobOffer, completeRecruiterProfile, getActiveCandidatesApplying, getRecruiterJobPostings } = require("../controllers/recruiter");
const { roleValidationRecruiter } = require("../validators/recruiter");

router.post(
  "/create-job-offer",
  passport.authenticate("jwt", { session: false }),
  roleValidationRecruiter,
  createJobOffer
);

router.post(
  "/complete-profile",
  passport.authenticate("jwt", { session: false }),
  roleValidationRecruiter,
  completeRecruiterProfile
);

router.get(
  "/get-job-postings",
  passport.authenticate("jwt", { session: false }),
  roleValidationRecruiter,
  getRecruiterJobPostings
);

router.get(
  "/get-candidates/:jobId",
  passport.authenticate("jwt", { session: false }),
  roleValidationRecruiter,
  getActiveCandidatesApplying
);



module.exports = router;
