http = require('http');
router = require('./src/server/router.js')

http.createServer((request, response) => {

	router.home(request, response);
	router.subreddit(request, response);

}).listen(8000);

console.log('Server Started. Listening on Port 8000. Press Control C to stop.')