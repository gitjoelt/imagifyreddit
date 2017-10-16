fs = require('fs');

function view(template, values, response){

	let file;

	file = fs.readFileSync(`./views/${template}.html`,{ encoding:'utf8' });

	for(let key in values){
		file = file.replace('{{{' + key +'}}}', values[key]);
	}

	response.write(file + '\n');
}

function asset(request, response){

	try{
		const file = fs.readFileSync(`.${request.url}`);
		response.write(file);
	} catch(e){

		return false;
	}
    

}


module.exports.view = view;
module.exports.asset = asset;