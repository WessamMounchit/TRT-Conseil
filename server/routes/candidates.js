const { Router } = require("express");
const router = Router();
const {
  applicationValidation,
  completeProfileValidation,
  roleValidationCandidate,
} = require("../validators/candidate");
const {
  applyToJob,
  completeCandidateProfile,
  getApprouvedJobPostings,
  getJobsApplied,
  removeApplication,
  checkAccountActivation,
  checkCandidateProfile,
} = require("../controllers/candidate");
const upload = require("../middlewares/multer-config");
const { passportAuth } = require("../middlewares/passport-auth");

router.post(
  "/application/:jobId",
  passportAuth,
  applicationValidation,
  applyToJob
);

router.post(
  "/complete-profile",
  passportAuth,
  completeProfileValidation,
  upload.single("cv"),
  completeCandidateProfile
);

router.get(
  "/get-job-postings",
  passportAuth,
  roleValidationCandidate,
  getApprouvedJobPostings
);

router.get(
  "/get-jobs-applied",
  passportAuth,
  roleValidationCandidate,
  getJobsApplied
);

router.get(
  "/check-account-activation",
  passportAuth,
  roleValidationCandidate,
  checkAccountActivation
);

router.get(
  "/check-profile-completion",
  passportAuth,
  roleValidationCandidate,
  checkCandidateProfile
);

router.delete(
  "/remove-application/:jobId",
  passportAuth,
  roleValidationCandidate,
  removeApplication
);

module.exports = router;
