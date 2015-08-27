(function() {

    var app = {

        init: function() {
            //Launch accordion
            app.accordion();
            //Submit current Form
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
        submitForms: function() {
            var projectid = uuid.v1();

            $("#btn-submit1").click(function() {
                $.post('/api/application/' + projectid, $('#form-section1').serialize());
            });

            $("#btn-submit2").click(function() {
                $.post('/api/application/update2/' + projectid, $('#form-section2').serialize());
            });

            $("#btn-submit3a").click(function() {
                $.post('/api/application/update3a/' + projectid, $('#form-section3a').serialize());
            });

            $("#btn-submit3b").click(function() {
                $.post('/api/application/update3b/' + projectid, $('#form-section3b').serialize());
            });

            $("#btn-submit3c").click(function() {
                $.post('/api/application/update3c/' + projectid, $('#form-section3c').serialize());
            });

            $("#btn-submit4").click(function() {
                $.post('/api/application/update4/' + projectid, $('#form-section4').serialize());
            });

            $("#btn-submit5").click(function() {
                $.post('/api/application/update5/' + projectid, $('#form-section5').serialize());
            });
        },
        findAndSubmit: function(){
			$(".submit-button").click(function(e){
				
				e.preventDefault();
				//Get Attr
				var submitAttr = $(this).attr('data'),
					formId = document.getElementById(submitAttr),
					selection = $(formId).serialize();
				console.log(selection);
				
				//submit form
				//$.post('/api/application/update3b/' + projectid, $(formId).serialize());
			});

        }
    };
    app.init();
})();

