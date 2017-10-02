fs = require('fs');

function view(template, values, response){

	let readContents;

	readContents = fs.readFileSync(`./views/${template}.html`,{ encoding:'utf8' });

	for(let key in values){
		readContents = readContents.replace('{{{' + key +'}}}', values[key]);
	}

	response.write(readContents + '\n');
}


module.exports.view = view;