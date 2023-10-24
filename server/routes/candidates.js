const { Router } = require("express");
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const router = Router();
const passport = require("passport");
const { candidateValidation } = require("../validators/candidate");
const { applyToJob, completeCandidateProfile } = require("../controllers/candidate");
const upload = require("../middlewares/multer-config");

router.post(
  "/application/:candidateId/:jobId",
  passport.authenticate("jwt", { session: false }),
  candidateValidation,
  validationMiddleware,
  applyToJob
);

router.post(
  "/complete-profile/:userId",
  passport.authenticate("jwt", { session: false }),
  candidateValidation,
  validationMiddleware,
  upload.single("cv"),
  completeCandidateProfile
);

module.exports = router;
