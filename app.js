const express = require('express'); // ES6 based import

const app = express();

const port = 8080; // port to serve the requests.

function basicGet(req, res) {
	res.send('Start with basic get call..');
}

app.get('/', basicGet)

app.listen(port, () => {
	console.log(`port is {process.env.PORT} and coonection string is {process.env.ConnectionString}`);
});


