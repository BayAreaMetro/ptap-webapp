(function() {

    var app = {

        init: function() {
            //Launch accordion
            app.accordion();
            //Submit current Form
            app.projectid = uuid.v1();
            app.findAndSubmit();
        },
        accordion: function() {
            $('#va-accordion').vaccordion({
                accordionW: $(window).width(),
                accordionH: $(window).height(),
                visibleSlices: 5,
                expandedHeight: 450,
                animOpacity: 0.1,
                contentAnimSpeed: 100
            });
        },
        findAndSubmit: function(){
			$(".submit-button").click(function(e){
				
				e.preventDefault();
				//Get Attr
				var submitAttr = $(this).attr('data'),
					formId = document.getElementById(submitAttr),
					selection = $(formId).serialize();
					console.log(submitAttr);
				console.log(selection);
				
				//submit form
				$.post('/api/application' + submitAttr + app.projectid, $(formId).serialize());

			});

        }
    };
    app.init();
})();

