
$(document).ready(function(){

	let next = $('.next');
	let prev = $('.previous');
	let input = "";

	getUsersSearch(function(input){

		renderLoading();

		getImagesJSON(input, function(JSON){
			//subreddit exists and it has pictures
			if(!JSON[0].error){
				destroyStorage();
				saveToStorage(JSON);
				render(0);
			} else {
				renderError();
			}
		});
	});

	if(isStored()){

		let index = getIndex();
		render(index);
	}

	next.click(function(){

		let nextIndex = nextImage(getIndex());
		render(nextIndex);

	});

	prev.click(function(){

		let prevIndex = previousImage(getIndex());
		render(prevIndex);

	});


});