const express = require('express'); // Common-JS based import
const app = express();
const path = require('path');
const chalk = require('chalk'); // helps in colouring the text => use version 4.1 to work with Common-JS
const port = process.env.PORT; // port to serve the requests.

const sessionsRouter = require('./src/routers/sessionsRouter') // importing routers
const adminRouter = require('./src/routers/adminRouter')

app.set('views', 'src/views'); // setting the path containing views files
app.set('view engine', 'ejs'); // specify the view engine type. It can be EJS or React.

app.use(express.static(path.join(__dirname, '/public/'))); //rendering the index.html from pluralsight.

// adding the respective router to handle the routes.
app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
  console.log(`Server is running on port:${chalk.yellow(port)}`);  // port is passed as env variable from nodemonConig block in package.json
});


