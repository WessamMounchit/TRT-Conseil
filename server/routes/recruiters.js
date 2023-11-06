const { Router } = require("express");
const router = Router();
const {
  createJobOffer,
  completeRecruiterProfile,
  getActiveCandidatesApplying,
  getRecruiterJobPostings,
  checkRecruiterAccountActivation,
  checkRecruiterProfile,
} = require("../controllers/recruiter");
const {
  roleValidationRecruiter,
  recruiterCompleteProfileValidation,
  recruiterCreateJobOfferValidation,
} = require("../validators/recruiter");
const { passportAuth } = require("../middlewares/passport-auth");

router.post(
  "/create-job-offer",
  passportAuth,
  recruiterCreateJobOfferValidation,
  createJobOffer
);

router.post(
  "/complete-profile",
  passportAuth,
  recruiterCompleteProfileValidation,
  completeRecruiterProfile
);

router.get(
  "/get-job-postings",
  passportAuth,
  roleValidationRecruiter,
  getRecruiterJobPostings
);

router.get(
  "/get-candidates/:jobId",
  passportAuth,
  roleValidationRecruiter,
  getActiveCandidatesApplying
);

router.get(
  "/check-account-activation",
  passportAuth,
  roleValidationRecruiter,
  checkRecruiterAccountActivation
);

router.get(
  "/check-profile-completion",
  passportAuth,
  roleValidationRecruiter,
  checkRecruiterProfile
);

module.exports = router;
