const { Router } = require("express");
const router = Router();
const passport = require("passport");
const {
  applicationValidation,
  completeProfileValidation,
  roleValidationCandidate,
  checkAccountActivation,
} = require("../validators/candidate");
const {
  applyToJob,
  completeCandidateProfile,
  getApprouvedJobPostings,
  getJobsApplied,
  removeApplication,
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

router.get(
  "/get-jobs-applied",
  passport.authenticate("jwt", { session: false }),
  roleValidationCandidate,
  getJobsApplied
);

router.get(
  "/check-account-activation",
  passport.authenticate("jwt", { session: false }),
  roleValidationCandidate,
  checkAccountActivation,
  (req, res) => {
    const { isActive } = req;
    return res.status(200).json(isActive);
  }
);

router.delete(
  "/remove-application/:jobId",
  passport.authenticate("jwt", { session: false }),
  roleValidationCandidate,
  removeApplication
);

module.exports = router;
