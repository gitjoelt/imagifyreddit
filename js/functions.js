
function getUsersSearch(callback){
	
	let searchBox = $('.searchBox');
	let input = "";
	let timeout = null;

	searchBox.on('keydown', function(){
		
		if(timeout !== null){
			clearTimeout(timeout);
		}

		timeout = setTimeout(function(){
			
			input = searchBox.val();
			if(input.length > 2){
				callback(input);
			}

		}, 700);

	});
}


function getImagesJSON(query, options, callback){

	const urlParams = generateUrlParameters(options);

	if(!urlParams){
		$.get(`/${query}`, (data) => {
			callback(data);
		});
	} else {
		$.get(`/${query}?${urlParams}`, (data) => {
			callback(data);
		});
	}

}

function generateUrlParameters(options){

	let urlParams = "";
	for (let key in options) {
	    
	    if (urlParams != "") {
	        urlParams += "&";
	    }
	    
	    if(options[key]){
	    	urlParams += key + "=" + encodeURIComponent(options[key]);
		}
	}

	return urlParams;
}

function isStored(){

	let storage = sessionStorage.getItem('subredditData');
	if(storage){
		return true;
	} else { return false; }

}

function saveToStorage(data){

	let size = data.length - 1;
	sessionStorage.setItem('subredditData', JSON.stringify(data));
	sessionStorage.setItem('index', '0');
	sessionStorage.setItem('size', size.toString());
}

function destroyStorage(){
	sessionStorage.removeItem('subredditData');
	sessionStorage.removeItem('index');
	sessionStorage.removeItem('size');
}

function getCheckboxState(){
	return { gifv: $('#gifv').is(':checked'), 
			 gfy: $('#gfy').is(':checked'),
			 sfw: $('#sfw').is(':checked') };
}

function getCheckboxStateFromStorage(){
	
	const gfy = localStorage.getItem('gfy');
	const gifv = localStorage.getItem('gifv');
	const sfw = localStorage.getItem('sfw');

	return { gifv: gifv, gfy: gfy, sfw: sfw };
}

function saveCheckboxState(options){
	
	if(options.gifv){
		localStorage.setItem('gifv','checked');
	} else { localStorage.removeItem('gifv'); }
	
	if(options.gfy){
		localStorage.setItem('gfy', 'checked');
	} else { localStorage.removeItem('gfy'); }

	if(options.sfw){
		localStorage.setItem('sfw', 'checked');
	} else { localStorage.removeItem('sfw'); }
}

function setCheckboxState(options){
	
	if(options.gifv){
		$('#gifv').prop('checked', true);
	}
	
	if(options.gfy){
		$('#gfy').prop('checked', true);
	} 

	if(options.sfw){
		$('#sfw').prop('checked', true);
	} 
}

function getIndex(){
	return parseInt(sessionStorage.getItem('index'));
}

function getSize(){
	return parseInt(sessionStorage.getItem('size'));
}

function render(index){

	let subredditData = JSON.parse(sessionStorage.getItem('subredditData'));

	$('.errorHeader').hide();
	$('.details').show();
	$('#controls').show();
	$('h3.title').text(subredditData[index].title);
	$('p.author').text('Posted by: ' + subredditData[index].author);
	
	prepareMedia(subredditData[index].imgsrc);
	$('.picture').show();
}

function renderLoading(){

	$('.errorHeader').hide();
	$('.details').show();
	$('#controls').hide();
	$('h3.title').html('<i class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i> Gathering Images...');
	$('p.author').text('');
	$('.picture').hide();
}

function renderError(){

	$('.details').hide();
	$('.errorHeader').html('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Unable to retrieve pictures from that subreddit');
	$('.errorHeader').fadeIn(100);

}

function renderWarning(jQueryObject, cssClass){
	jQueryObject.hover(function(){
		$('.' + cssClass).show();
	}, function(){
		$('.' + cssClass).hide();
	});
}

function nextImage(index){

	let size = getSize();

	if(index !== size){
		index = index + 1;
	} else { index = 0; }

	sessionStorage.setItem('index', index.toString());
	return index;
}

function previousImage(index){
	
	let size = getSize();

	if(index !== 0){
		index = index - 1;
	} else { index = size; }

	sessionStorage.setItem('index', index.toString());
	return index;
}

function prepareMedia(src){

	const ext = src.substring((src.length - 3), src.length);

	if(src.indexOf('gfycat.com') !== -1){
		let mp4src = prepareGfycat(src);
		$('.picture').html("<video preload='auto' autoplay='autoplay' loop='loop'><source src='" + mp4src + "' type='video/mp4'></video>");
	}
	

	if(ext === "ifv"){
		let mp4src = prepareGifv(src);
		$('.picture').html("<video preload='auto' autoplay='autoplay' loop='loop'><source src='" + mp4src + "' type='video/mp4'></video>");
	}


	if(ext === 'jpg' || ext === 'gif'){
		$('.picture').html("<img src='" + src + "' />");
	}

	return false;
}

function prepareGifv(src){
	let noExt = src.substring(0,(src.length - 4));
	return noExt + 'mp4';
}

function prepareGfycat(src){
	let mp4src = src.replace('gfycat.com','giant.gfycat.com');
	return mp4src + '.mp4';
}