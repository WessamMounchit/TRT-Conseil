const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { SECRET } = require("../constants");
const db = require("../db");

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const { id } = payload;

      const { rows } = await db.query(
        "SELECT id, email, role_id FROM users WHERE id = $1",
        [id]
      );

      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      const user = { id: rows[0].id, email: rows[0].email, role: rows[0].role_id };

      return done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);
