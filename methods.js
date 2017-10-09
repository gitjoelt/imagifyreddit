https = require('https');
axios = require('axios');

function getValues(query, options, callback){

	let afterQuery = '';
	if(options.after) { 
		afterQuery = `&after=${options.after}`;
	}

	axios.get(`https://reddit.com/r/${query}.json?limit=100${afterQuery}`)
	.then((response) => {
		if(response.data){
			const pictureJSON = getImages(response.data, options);
			if(pictureJSON){
				callback(pictureJSON);
			} else {
				callback([{ 'error': `Unable to find pictures for ${query}` }]);
			}
		}
	})
	.catch((error) => {
		callback([{ 'error': error.message }]);
	});

}

function getImages(apiResponse, options){


	let images = findImages(apiResponse, options);

	if(images.length > 0){
		
		images = { 'after': apiResponse.data.after, 'posts': images }
		return images;

	} else { return false; }

}

function findImages(apiResponse, options){
	
	let images = [];

	apiResponse.data.children.forEach(function(post){

		//NSFW mode
		if(!options.sfw){
			if(acceptableExtension(post.data.url, options)){
				images.push({ 'title': post.data.title, 
							  'imgsrc': post.data.url, 
							  'author': post.data.author });
			}
		//SFW mode
		} else if (post.data.over_18 === false) {
			if(acceptableExtension(post.data.url, options)){
				images.push({ 'title': post.data.title, 
							  'imgsrc': post.data.url, 
							  'author': post.data.author });
			}
		}

	});

	return images;
}

function acceptableExtension(url, options){
	

	const ext = url.substring((url.length - 3), url.length);

	if(options.gfy){
		if(url.indexOf('gfycat.com') !== -1){
			return true;
		}
	}

	if(options.gifv){
		if(ext === "ifv"){
			return true;
		}
	}

	if(ext === 'jpg' || ext === 'gif'){
		return true;
	}


	return false;

}

function pickRandom(pictureArray){
	return Math.floor(Math.random() * ((pictureArray.length - 1) - 0) + 0);
}

module.exports.getValues = getValues;