render = require('./renderer.js');
lib = require('./methods.js');

function home(request, response){

	//css
	if(request.url.indexOf('.css') !== -1){

		response.setHeader('Content-Type', 'text/css');
		render.css(request, response);
		response.end();

	}

	//js
	if(request.url.indexOf('.js') !== -1){

		response.setHeader('Content-Type', 'text/javascript');
		render.js(request, response);
		response.end();
		
	}

	if(request.url === "/" && request.url.indexOf('.css') === -1 && request.url.indexOf('.js') === -1){

		response.setHeader('Content-Type', 'text/html');
		render.view('header', {}, response);
		render.view('error', {}, response);
		render.view('image', {}, response);
		render.view('footer', {}, response);
		response.end();

	}

}

function subreddit(request, response){

	let query = request.url.replace('/','');

	if(query.length > 0 && query !== 'favicon.ico' && 
	   query.indexOf('.css') === -1 && request.url.indexOf('.js') === -1)
	{

		response.setHeader('Content-Type', 'application/json');

		lib.getValues(query, (values) => {
			
			response.write(JSON.stringify(values));
			response.end();

		});	
		
	}
}

module.exports.home = home;
module.exports.subreddit = subreddit;