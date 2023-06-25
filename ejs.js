const express = require('express'); // Common-JS based import
const app = express();
const path = require('path')

const chalk = require('chalk'); // helps in colouring the text => use version 4.1 to work with Common-JS
const port = process.env.PORT; // port to serve the requests.

app.set('views', 'src/views'); // setting the path containing views files
app.set('view engine', 'ejs'); // specify the view engine type. It can be EJS or React.

app.get('/', (req, res) => {
  res.render('index', { title: "Cafee Express", data: [5, 6, 7, 8, 9, 10] });  // Rendering the view and passing parameter alongside.
});


app.listen(port, () => {
  console.log(`Server is running on port:${chalk.green(port)}`);  // port is passed as env variable from nodemonConig block in package.json
});


