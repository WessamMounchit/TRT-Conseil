const { Router } = require("express");
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const { approveAccount, approveJobOffer, approveApplication } = require("../controllers/consultant");
const router = Router();
const passport = require("passport");
const { consultantValidation, approuveApplicationValidation } = require("../validators/consultant");

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
  approuveApplicationValidation,
  validationMiddleware,
  approveApplication
);

module.exports = router;
