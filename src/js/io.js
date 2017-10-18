
$(document).ready(function(){

	/******************************
	Init
	******************************/

	const overlay = $('.mainoverlay');
	const close = $('.close');
	const next = $('.next');
	const prev = $('.previous');
	const gifv = $('#gifv');
	const gfy = $('#gfy');
	const sfw = $('#sfw');
	let checkboxes = $('input[type=checkbox]');
	let options = getCheckboxStateFromStorage();
	setCheckboxState(options);


	/******************************
	User Input & Initial Load
	******************************/

	getUsersSearch(function(input){

		renderLoading();
		options = getCheckboxState();

		getImagesJSON(input, options, function(JSON){
			//subreddit exists and it has pictures
			if(JSON.posts){
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


	/******************************
	Controls
	******************************/

	next.click(function(){

		const nextIndex = nextImage(getIndex());
		render(nextIndex);
		renderDonate(nextIndex);

	});

	prev.click(function(){

		const prevIndex = previousImage(getIndex());
		render(prevIndex);

	});

	checkboxes.click(function(){
		
		const input = $('.searchBox').val();
		options = getCheckboxState();
		saveCheckboxState(options);

		if(input.length > 2){

			renderLoading();

			getImagesJSON(input, options, function(JSON){
				//subreddit exists and it has pictures
				if(JSON.posts){
					destroyStorage();
					saveToStorage(JSON);
					render(0);
				} else {
					renderError();
				}
			});
		}

	});

	close.click(function(){
		overlay.hide();
		$('.searchBox').select();
	});

	if($(window).width() > 1024){
		renderWarning($('#imgPref'),'dataWarning');
		renderWarning($('#sfwPref'),'nsfwWarning');
	}

});