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
const {
  roleValidationConsultant,
  JobPostingValidation,
  approveCandidatAccountValidation,
  approveRecruiterAccountValidation,
  approveApplicationValidation,
} = require("../validators/consultant");
const { passportAuth } = require("../middlewares/passport-auth");

router.post(
  "/approve-candidate/:accountId",
  passportAuth,
  approveCandidatAccountValidation,
  approveCandidateAccount
);

router.post(
  "/approve-recruiter/:accountId",
  passportAuth,
  approveRecruiterAccountValidation,
  approveRecruiterAccount
);

router.post(
  "/desactivate-candidate-account/:accountId",
  passportAuth,
  roleValidationConsultant,
  desactivateCandidateAccount
);

router.post(
  "/desactivate-recruiter-account/:accountId",
  passportAuth,
  roleValidationConsultant,
  desactivateRecruiterAccount
);

router.post(
  "/approuve-job-posting/:jobId",
  passportAuth,
  JobPostingValidation,
  approveJobOffer
);

router.post(
  "/unapprouve-job-posting/:jobId",
  passportAuth,
  roleValidationConsultant,
  unapproveJobOffer
);

router.post(
  "/unapprouve-application/:applicationId",
  passportAuth,
  roleValidationConsultant,
  unapproveApplication
);

router.post(
  "/approuve-application/:applicationId",
  passportAuth,
  approveApplicationValidation,
  approveApplication
);

router.get(
  "/get-candidates",
  passportAuth,
  roleValidationConsultant,
  getCandidates
);

router.get(
  "/get-recruiters",
  passportAuth,
  roleValidationConsultant,
  getRecruiters
);

router.get(
  "/get-job-postings",
  passportAuth,
  roleValidationConsultant,
  getJobPostings
);

router.get(
  "/get-applications",
  passportAuth,
  roleValidationConsultant,
  getApplications
);

router.delete(
  "/delete-user/:accountId",
  passportAuth,
  roleValidationConsultant,
  deleteUser
);

router.delete(
  "/delete-job/:jobId",
  passportAuth,
  roleValidationConsultant,
  deleteJob
);

router.delete(
  "/delete-application/:applicationId",
  passportAuth,
  roleValidationConsultant,
  deleteApplication
);

module.exports = router;
