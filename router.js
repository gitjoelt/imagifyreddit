const render = require('./renderer.js');
const lib = require('./methods.js');
const url = require('url');

function home(request, response){

	const urlData = url.parse(request.url, true);

	//css
	if(urlData.pathname.indexOf('.css') !== -1){

		response.setHeader('Content-Type', 'text/css');
		render.css(request, response);
		response.end();

	}

	//js
	if(urlData.pathname.indexOf('.js') !== -1){

		response.setHeader('Content-Type', 'text/javascript');
		render.js(request, response);
		response.end();
		
	}

	if(urlData.pathname === "/" && urlData.pathname.indexOf('.css') === -1 && urlData.pathname.indexOf('.js') === -1){

		response.setHeader('Content-Type', 'text/html');
		render.view('header', {}, response);
		render.view('error', {}, response);
		render.view('image', {}, response);
		render.view('footer', {}, response);
		response.end();

	}

}

function subreddit(request, response){

	const urlData = url.parse(request.url, true);
	let query = urlData.pathname.replace('/','');
	let options = {};

	if(query.length > 0 && query !== 'favicon.ico' && 
	   query.indexOf('.css') === -1 && request.url.indexOf('.js') === -1)
	{

		options = urlData.query;
		response.setHeader('Content-Type', 'application/json');

		lib.getValues(query, options, (values) => {
			
			response.write(JSON.stringify(values));
			response.end();

		});	
		
	}
}

module.exports.home = home;
module.exports.subreddit = subreddit;