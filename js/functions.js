
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


function getImagesJSON(query, callback){

	$.get(`/${query}`, (data) => {
		callback(data);
	});
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
	$('img.picture').show();
	$('img.picture').attr('src', subredditData[index].imgsrc);
}

function renderLoading(){

	$('.errorHeader').hide();
	$('.details').show();
	$('#controls').hide();
	$('h3.title').html('<i class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i> Gathering Images...');
	$('p.author').text('');
	$('img.picture').hide();
}

function renderError(){

	$('.details').hide();
	$('.errorHeader').html('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Unable to retrieve pictures from that subreddit');
	$('.errorHeader').fadeIn(100);

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