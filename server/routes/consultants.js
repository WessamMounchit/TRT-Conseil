const { Router } = require("express");
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const { approveAccount, approveJobOffer } = require("../controllers/consultant");
const router = Router();
const passport = require("passport");
const { consultantValidation } = require("../validators/consultant");

router.post(
  "/approuve-account/:id",
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

module.exports = router;
