const { Router } = require("express");
const { register, login } = require("../controllers/auth");
const { registerValidation, loginValidation } = require("../validators/auth");
const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;
