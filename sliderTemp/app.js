window.onload = function(){
	rangeSlider.init();
	rangeSlider.getData();
}

var rangeSlider = {
	s: null,
	init: function(){
		rangeSlider.s = $("#trackLength").slider({});
	},
	getData: function(){
		var value = rangeSlider.s.slider('getValue')
		console.log(value);
		return value;
	}
}

