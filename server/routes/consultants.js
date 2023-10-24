const { Router } = require("express");
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const { approveAccount, approveJobOffer, approveApplication, getUsers, getJobPostings } = require("../controllers/consultant");
const router = Router();
const passport = require("passport");
const { consultantValidation, roleValidationConsultant } = require("../validators/consultant");

router.post(
  "/approuve-account/:accountId",
  passport.authenticate("jwt", { session: false }),
  consultantValidation,
  validationMiddleware,
  approveAccount
);

router.post(
  "/approuve-job-offer/:jobId",
  passport.authenticate("jwt", { session: false }),
  consultantValidation,
  validationMiddleware,
  approveJobOffer
);

router.post(
  "/approuve-application/:candidateId/:jobId",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  validationMiddleware,
  approveApplication
);

router.get(
  "/get-users",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  validationMiddleware,
  getUsers
);

router.get(
  "/get-job-postings",
  passport.authenticate("jwt", { session: false }),
  roleValidationConsultant,
  validationMiddleware,
  getJobPostings
);

module.exports = router;
