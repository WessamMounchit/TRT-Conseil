const passport = require('passport')

exports.passportAuth = passport.authenticate('jwt', { session: false })