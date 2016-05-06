window.onload = function(){
	elements.init();
	navigation.init();
}

var elements = {
	navDiv: null,
	navBtns: null,
	pages: null,
	calcMain: null,
	calcBtns: new Array(),
	calcScreen: null,

	init: function(){
		this.navDiv = document.getElementById('nav');
		this.navBtns = document.getElementsByClassName("navBtns");
		this.pages = document.getElementsByClassName("page");
	}
}

var navigation = {
	init: function(){
		for (var i = 0; i < elements.navBtns.length; i++) {
			elements.navBtns[i].addEventListener('click', this.handler, false);
		}
	},
 	handler: function(){
		var show;
		if(this.id.indexOf("Main") > -1){
			show = 0;
		} else if(this.id.indexOf("App") > -1){
			show = 1;
		} else if(this.id.indexOf("ReadMe") > -1){
			show = 2;
		}
		for(var i = 0; i < elements.pages.length; i++){
			elements.pages[i].style.display = (i == show) ? "block" : "none";	
		}
	}
}
