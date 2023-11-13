const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { SECRET } = require("../constants");
const db = require("../db");


const cookieExtractor = function (req) {
  let token = null
  if (req && req.cookies) token = req.cookies['token']
  return token
}

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
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
