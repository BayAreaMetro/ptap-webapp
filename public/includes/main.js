$('#divlist h5').click(function() {
  $(this).find("i.glyphicon").toggleClass("glyphicon-minus-sign glyphicon-plus-sign");
});

(function(){
	
	var app = {
		
		init: function(){
			//Launch accordion
			app.accordion();
			console.log("Workks");
		},
		accordion: function(){
			$('#va-accordion').vaccordion({
				accordionW		: $(window).width(),
				accordionH		: $(window).height(),
				visibleSlices	: 5,
				expandedHeight	: 450,
				animOpacity		: 0.1,
				contentAnimSpeed: 100
			});
		}
	}
	app.init();
})();