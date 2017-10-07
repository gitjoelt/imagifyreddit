https = require('https');
axios = require('axios');
url = require('url');


function getValues(query, callback){

	axios.get(`https://reddit.com/r/${query}.json?limit=60`)
	.then((response) => {
		if(response.data){
			const pictureJSON = getImages(response.data);
			if(pictureJSON){
				callback(pictureJSON);
			} else {
				callback([{ 'error': `Unable to find pictures for ${query}` }]);
			}
		}
	})
	.catch((error) => {
		callback({ 'error': error });
	});

}

function getImages(apiResponse){

	let images = findImages(apiResponse);

	if(images.length > 0){
		
		return images;

	} else { return false; }

}

function findImages(apiResponse){
	
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

module.exports.getValues = getValues;