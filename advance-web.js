const express = require('express'); // Common-JS based import
const morgan = require('morgan');
const app = express();
const path = require('path');
const chalk = require('chalk'); // helps in colouring the text => use version 4.1 to work with Common-JS
const port = process.env.PORT; // port to serve the requests.
// For authenication and authorization
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// importing routers
const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');

// Middlewares => all middlewares run in the order they are defined.
app.use(morgan('tiny')); // Insights about web-requests.
app.use(express.static(path.join(__dirname, '/public/'))); //rendering the index.html from pluralsight.
app.use(express.json()); // Parses the body data into json object
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'Global-Tech' }));

// We need this after above middlewares are called.
// Calling this passport middleware which is a function that needs input => 'app' object
require('./src/config/passport.js')(app);

app.set('views', 'src/views'); // setting the path containing views files
app.set('view engine', 'ejs'); // specify the view engine type. It can be EJS or React.

// adding the respective router to handle the routes.
app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on port:${chalk.yellow(port)}`);  // port is passed as env variable from nodemonConig block in package.json
});


