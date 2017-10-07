http = require('http');
router = require('./router.js')

http.createServer((request, response) => {

	router.home(request, response);
	router.subreddit(request, response);

}).listen(3000);

console.log('Server Started. Listening on Port 3000. Press Control C to stop.')