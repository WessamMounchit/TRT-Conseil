const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require("./constants");
const passport = require("passport");
const cors = require("cors");

//INITIALIZE MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

//PASSPORT MIDDLEWARE
require("./middlewares/passport-middleware");

//IMPORT ROUTES
const authRoutes = require('./routes/auth')
const consultantsRoutes = require('./routes/consultants')
const recruitersRoutes = require('./routes/recruiters')
const adminRoutes = require('./routes/admin')
//INITIALIZE ROUTES
app.use('/auth', authRoutes)
app.use('/consultants', consultantsRoutes)
app.use('/recruiters', recruitersRoutes)
app.use('/admin', adminRoutes)


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