const { Router } = require("express");
const {
  approveAccount,
  approveJobOffer,
  approveApplication,
  getUsers,
  getJobPostings,
  desactivateAccount,
  deleteUser,
  unapproveJobOffer,
  deleteJob,
  getApplications,
  unapproveApplication,
  deleteApplication,
} = require("../controllers/consultant");
const router = Router();
const passport = require("passport");
const {
  roleValidationConsultant,
  approuveAccountValidation,
  JobPostingValidation,
  approuveApplicationValidation,
} = require("../validators/consultant");

router.post(
  "/approuve-account/:accountId",
  passport.authenticate("jwt", { session: false }),
  approuveAccountValidation,
  approveAccount
);

router.post(
  "/desactivate-account/:accountId",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  desactivateAccount
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
  approuveApplicationValidation,
  approveApplication
);

router.get(
  "/get-users",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  getUsers
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
