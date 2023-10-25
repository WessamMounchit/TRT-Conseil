const { Router } = require("express");
const router = Router();
const passport = require("passport");
const {
  applicationValidation,
  completeProfileValidation,
  roleValidationCandidate,
} = require("../validators/candidate");
const {
  applyToJob,
  completeCandidateProfile,
  getApprouvedJobPostings,
} = require("../controllers/candidate");
const upload = require("../middlewares/multer-config");

router.post(
  "/application/:jobId",
  passport.authenticate("jwt", { session: false }),
  applicationValidation,
  applyToJob
);

router.post(
  "/complete-profile",
  passport.authenticate("jwt", { session: false }),
  completeProfileValidation,
  upload.single("cv"),
  completeCandidateProfile
);

router.get(
  "/get-job-postings",
  passport.authenticate("jwt", { session: false }),
  roleValidationCandidate,
  getApprouvedJobPostings
);

module.exports = router;
