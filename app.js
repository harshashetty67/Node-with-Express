const express = require('express'); // Common-JS based import
const app = express();

const chalk = require('chalk'); // helps in colouring the text => use version 4.1 to work with Common-JS
const morgan = require('morgan'); // morgan-package gives insights about the web-requests.
const path = require('path'); // for path related tasks - no need to install this package(comes by default)
const debug = require('debug')('app'); // setting debug to 'app' level scope.

const bookRouter = express.Router();
const port = process.env.PORT; // port to serve the requests.

//const db = mongoose.connect('mongodb+srv://harshashetty67:dHs8ttYwb2hvf7Fr@my-mongo.elbhwd6.mongodb.net/');


function basicGet(req, res) {
	res.send('Start with basic get call..');
}

app.use(morgan('tiny')); // 'tiny' gives short-info , if you pass 'combined' you get detailed info.

/*
- Path to the index.html file => using express.static() helper to render static html page. We can given the path directly.
_ The static html page helps in loading static content, without restarting node server app.
*/
app.use(express.static(path.join(__dirname, '/public/')));


// If static we page is not present then this basic get() callback is invoked.
// the callback response gets ignored, if express finds index.html page
// all app.use() should be assigned before api call.

app.get('/', basicGet);

/*bookRouter.route('/books').get((req, res) => { 
	res.json({ hello: "my json result" });
}
)*/

//app.use('/api', bookRouter);  // attaching the router object.

app.listen(port, () => {
	console.log(`Server is running on port:${chalk.green(port)}`);  // port is passed as env variable from nodemonConig block in package.json
	debug('This is a debug message and it can only be seen in DEBUG mode.');
	/* 	 - We can see debug message when we run => 'DEBUG=app node <file-name>.js' 
			 - This command works in Linux- only 
	*/
});


