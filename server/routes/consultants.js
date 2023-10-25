const { Router } = require("express");
const { approveAccount, approveJobOffer, approveApplication, getUsers, getJobPostings } = require("../controllers/consultant");
const router = Router();
const passport = require("passport");
const { roleValidationConsultant, approuveAccountValidation, JobPostingValidation } = require("../validators/consultant");

router.post(
  "/approuve-account/:accountId",
  passport.authenticate("jwt", { session: false }),
  approuveAccountValidation,
  approveAccount
);

router.post(
  "/approuve-job-posting/:jobId",
  passport.authenticate("jwt", { session: false }),
  JobPostingValidation,
  approveJobOffer
);

router.post(
  "/approuve-application/:candidateId/:jobId",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
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

module.exports = router;
