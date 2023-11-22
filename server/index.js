const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require("./constants");
const cookieParser = require('cookie-parser');
const passport = require("passport");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

//INITIALIZE MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

//PASSPORT MIDDLEWARE
require("./middlewares/passport-middleware");

//IMPORT ROUTES
const authRoutes = require("./routes/auth");
const consultantsRoutes = require("./routes/consultants");
const recruitersRoutes = require("./routes/recruiters");
const adminRoutes = require("./routes/admin");
const candidatesRoutes = require("./routes/candidates");
//INITIALIZE ROUTES
app.use("/auth", authRoutes);
app.use("/consultants", consultantsRoutes);
app.use("/recruiters", recruitersRoutes);
app.use("/admin", adminRoutes);
app.use("/candidates", candidatesRoutes);

//MULTEUR ERRORS
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: "Veuillez fournir un PDF valide" });
  }
});

// RUN SERVER
const runApp = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Le serveur tourne au port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Erreur: ${error.message}`);
  }
};

runApp();
