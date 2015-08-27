(function() {

    var app = {

        init: function() {
            //Launch accordion
            app.accordion();
            app.projectid = uuid.v1();
            app.kendoElements();
            app.findAndSubmit(); //Submit current Form
            app.loadJurisdictions();
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
        findAndSubmit: function() {
            $(".submit-button").click(function(e) {

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

        },
        kendoElements: function() {
            function onselect(e) {

            }

            $("#jurisdiction").kendoDropDownList({
                dataTextField: "Jurisdiction",
                dataValueField: "Jurisdiction",
                dataSource: {
                    transport: {
                        read: {
                            dataType: "json",
                            url: "/api/jurisdiction/name",
                        }
                    }
                },
                select: app.onselect
            });
        },
        loadJurisdictions: function() {
            $.ajax({
                url: "/api/jurisdiction",
                success: function(result) {
                    app.Jurisdictions = result;
                    
                    //Testing Custom Drop Downs
                    app.dropDown(result);
                    console.log(results);
                }
            });
        },
        findAndSubmit: function(){

	        //submit class on all buttons
			$(".submit-button").click(function(){

				//Gloabl
				app.parseForm = $(this).attr('data');

				//Get Attr
				var submitAttr = $(this).attr('data'),
					formId = document.getElementById(submitAttr),
					selection = $(formId).serialize();

				//submit form
				app.validate(formId);
				//$.post('/api/application/update3b/' + projectid, $(formId).serialize());

				//Testing
				console.log(selection);
			});
        },
        validate: function(currentForm){

			//Pass current form id and then validate
	        $(currentForm).parsley().validate();
	    },
        onselect: function(e) {
            var dataItem = this.dataItem(e.item);
            var vals = app.Jurisdictions;
            var lookupVal = dataItem.Jurisdiction;
            for (var i = vals.length - 1; i >= 0; i--) {
                if (vals[i].Jurisdiction === lookupVal) {
                    //Autopopulate values
                    $('#network_centerlinemiles').val(vals[i]['Total Centerline Miles']);
                    $('#last_major_inspection').val(vals[i]['Certification Date']);
                }
            }
        },
        dropDown: function(data){
	        var sourceArr = [];
	
	        for (var i = 0; i < data.length; i++) {
	            sourceArr.push(data[i].value, data[i].text);
	            console.log(data[i].value, data[i].text);
	            $("#drop-test").append('<option data-number=' + data[i].value +'>'+ data[i].text + '</option>');
	        }
	    }
    };
    app.init();
})();
