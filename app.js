http = require('http');
render = require('./renderer.js');
lib = require('./methods.js');

http.createServer((request, response) => {

	let urlPath = lib.getURLPath(request);
	let query = lib.getQueryFromURLPath(urlPath);

	if(urlPath === "/"){

		response.setHeader('Content-Type', 'text/html');
		render.view('header', {}, response);
		render.view('footer', {}, response);
		response.end();

	} 

	if(query.length > 0 && query !== 'favicon.ico')
	{
		console.log("query string: " + query);
		response.setHeader('Content-Type', 'text/html');

		lib.getValues(query, (values) => {
			
			render.view('header', {}, response);
			if(values.error){
				render.view('error', values, response);
			} else {
				render.view('image', values, response);
			}
			render.view('footer', {}, response);
			response.end();

		});	
		
	}

}).listen(3000);