// JavaScript Document

function PreloadImages(){
	var myimages=new Array();
		
	for (i=0;i<PreloadImages.arguments.length;i++){
		myimages[i] = new Image();
		myimages[i].src = PreloadImages.arguments[i];
	}
}

PreloadImages("img/left-arrow.gif","img/left-arrow_disable.gif","img/right-arrow.gif","img/right-arrow_disable.gif",
					"img/home.gif", "img/bike.gif", "img/computer.png",
					"img/newyearseve.gif", "img/Testtube.gif", "img/mit.gif","img/camera.gif",
					"img/stats.gif", "img/painting.gif", "img/apple.gif",
					"img/restaurant.gif", "img/services.gif", "img/column.gif","img/ptack2.png",
					"img/wikimap.png","mapfiles/transparent.gif","mapfiles/mit-transparent-512.gif",
					"img/nolines_minus.gif","img/nolines_plus.gif");