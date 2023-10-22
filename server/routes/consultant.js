const { Router } = require("express");
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const {} = require("../validators/auth");
const { approveAccount } = require("../controllers/consultant");
const router = Router();
const passport = require("passport");
const { consultantValidation } = require("../validators/consultant-validators");

router.post(
  "/approuve-account/:id",
  passport.authenticate("jwt", { session: false }),
  consultantValidation,
  validationMiddleware,
  approveAccount
);

module.exports = router;
