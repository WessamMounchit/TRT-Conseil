//ROLE VALIDATION
exports.roleValidationRecruiter = async (req, res, next) => {
  const recruiterRole = req.user.role;

  if (recruiterRole !== 3) {
    return res
    .status(500)
    .json({ error: "Permission refusée" });
  } else {
    next()
  }
};