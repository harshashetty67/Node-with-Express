const passport = require('passport');
require('./stratergy/local.stratergy')();
// Exporting the function that takes an argument.
// Example of export where we export and define a function on gp.
module.exports = function PassportConfig(app) {

  app.use(passport.initialize());  // Initialize the passport to handle incoming request for authentication.
  app.use(passport.session()); // For maintaining the login session after successful authentication.

  passport.serializeUser((user, done) => {
    done(null, user);
  })

  passport.deserializeUser((user, done) => {
    done(null, user);
  })
}
/*
passport.session() :
===================
- Middleware that will restore login state from a session.
- Web applications typically use sessions to maintain login state between requests. 
- For example, a user will authenticate by entering credentials into a form which is submitted to the server. 
- If the credentials are valid, a login session is established by setting a cookie containing a session identifier in the user's web browser. 
- The web browser will send this cookie in subsequent requests to the server, allowing a session to be maintained.
*/