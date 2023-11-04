const { Router } = require("express");
const {
  approveJobOffer,
  approveApplication,
  getJobPostings,
  deleteUser,
  unapproveJobOffer,
  deleteJob,
  getApplications,
  unapproveApplication,
  deleteApplication,
  approveCandidateAccount,
  approveRecruiterAccount,
  getCandidates,
  getRecruiters,
  desactivateCandidateAccount,
  desactivateRecruiterAccount,
} = require("../controllers/consultant");
const router = Router();
const passport = require("passport");
const {
  roleValidationConsultant,
  JobPostingValidation,
  approveCandidatAccountValidation,
  approveRecruiterAccountValidation,
  approveApplicationValidation,
} = require("../validators/consultant");

router.post(
  "/approve-candidate/:accountId",
  passport.authenticate("jwt", { session: false }),
  approveCandidatAccountValidation,
  approveCandidateAccount
);

router.post(
  "/approve-recruiter/:accountId",
  passport.authenticate("jwt", { session: false }),
  approveRecruiterAccountValidation,
  approveRecruiterAccount
);

router.post(
  "/desactivate-candidate-account/:accountId",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  desactivateCandidateAccount
);

router.post(
  "/desactivate-recruiter-account/:accountId",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  desactivateRecruiterAccount
);

router.post(
  "/approuve-job-posting/:jobId",
  passport.authenticate("jwt", { session: false }),
  JobPostingValidation,
  approveJobOffer
);

router.post(
  "/unapprouve-job-posting/:jobId",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  unapproveJobOffer
);

router.post(
  "/unapprouve-application/:applicationId",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  unapproveApplication
);

router.post(
  "/approuve-application/:applicationId",
  passport.authenticate("jwt", { session: false }),
  approveApplicationValidation,
  approveApplication
);

router.get(
  "/get-candidates",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  getCandidates
);

router.get(
  "/get-recruiters",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  getRecruiters
);

router.get(
  "/get-job-postings",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  getJobPostings
);

router.get(
  "/get-applications",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  getApplications
);

router.delete(
  "/delete-user/:accountId",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  deleteUser
);

router.delete(
  "/delete-job/:jobId",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  deleteJob
);

router.delete(
  "/delete-application/:applicationId",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  deleteApplication
);

module.exports = router;
