fs = require('fs');

function view(template, values, response){

	let file;

	file = fs.readFileSync(`./views/${template}.html`,{ encoding:'utf8' });

	for(let key in values){
		file = file.replace('{{{' + key +'}}}', values[key]);
	}

	response.write(file + '\n');
}

function css(request, response){

	let file;

	file = fs.readFileSync(`.${request.url}`);
    response.write(file);

}

function js(request, response){

	let file;

	file = fs.readFileSync(`.${request.url}`);
    response.write(file);

}


module.exports.view = view;
module.exports.css = css;
module.exports.js = js;