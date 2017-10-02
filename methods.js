https = require('https');
axios = require('axios');
url = require('url');

function getURLPath(request){
	const urlOptions = url.parse(request.url);
	return urlOptions.path;
}

function getQueryFromURLPath(path){
	return path.replace('/','');
}

function getValues(query, callback){

	axios.get(`https://reddit.com/r/${query}.json?limit=60`)
	.then((response) => {
		if(response.data){
			const pictureData = parseValues(response.data);
			if(pictureData){
				callback(pictureData);
			} else {
				callback({ 'error': `Unable to find pictures for ${query}` });
			}
		}
	})
	.catch((error) => {
		callback({ 'error': error });
	});

}

function parseValues(apiResponse){

	let images = getImages(apiResponse);

	if(images.length > 0){
		
		const index = pickRandom(images);
		console.dir(images);

		return {

			'title': images[index].title,
			'imgsrc': images[index].imgsrc,
			'author': images[index].author
		};

	} else { return false; }

}

function getImages(apiResponse){
	
	let images = [];

	apiResponse.data.children.forEach((post) => {
		if(acceptableExtension(post.data.url)){
			images.push({ 'title': post.data.title, 'imgsrc': post.data.url, 'author': post.data.author});
		}
	});

	return images;
}

function acceptableExtension(url){
	const ext = url.substring((url.length - 3), url.length);
	if(ext === 'jpg' || ext === 'gif'){
		return true;
	} else { return false; }
}

function pickRandom(pictureArray){
	return Math.floor(Math.random() * ((pictureArray.length - 1) - 0) + 0);
}

module.exports.getURLPath = getURLPath;
module.exports.getQueryFromURLPath = getQueryFromURLPath;
module.exports.getValues = getValues;