(function() {

    var app = {

        init: function() {
            //Launch accordion
            app.accordion();
            app.projectid = uuid.v1();
            // app.kendoElements();
            app.findAndSubmit(); //Submit current Form
            app.loadJurisdictions();
            app.change();
            app.additionalFunds();
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

                //Gloabl
                app.parseForm = $(this).attr('data');

                //Get Attr
                var submitAttr = $(this).attr('data'),
                    formId = document.getElementById(submitAttr),
                    selection = $(formId).serialize();
                console.log(submitAttr);
                console.log(selection);

                //Validate form
                app.validate(formId);
                
                //Submit form
				app.post(formId, submitAttr, app.projectId);
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
                    // console.log(result);
                }
            });
        },
        validate: function(currentForm) {

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
        dropDown: function(data) {
            var sourceArr = [];

            for (var i = 0; i < data.length; i++) {
                sourceArr.push(data[i].Jurisdiction);
                //$("#jurisdiction").append('<option>' + data[i].Jurisdiction + '</option>');
                $("#jurisdiction").append('<option data-date=' + data[i]['Certification Date'] + ' data-miles=' + data[i]['Total Centerline Miles'] + '>' + data[i].Jurisdiction + '</option>');
                //console.log(data[i].Jurisdiction);
            }
        },
        change: function() {
            $("#jurisdiction").change(function() {
                //declaring varibles here and initializing after. 
                var currentJurisdiction, dataMiles, dataDate;

                //Value of Input
                currentJurisdiction = $(this).val();

                //Filter data attributes - date
                dataDate = $('#jurisdiction option').filter(function() {
                    return this.value == currentJurisdiction;
                }).data('date');

                //Filter data attributes - miles
                dataMiles = $('#jurisdiction option').filter(function() {
                    return this.value == currentJurisdiction;
                }).data('miles');

                //Populate on change
                app.autoPopulateValues(dataDate, dataMiles);

                //testing
                console.log(dataDate, dataMiles);
            });
        },
        autoPopulateValues: function(date, miles) {
            app.resetForms();
            var pmsGrantAmount = miles * 300,
                networkTotalPercentage = 100 - (100 * (miles - 333.33) / miles),
                networkMilesRemaining = miles - 333.33,
                pmsLocalContribution = pmsGrantAmount * 0.2,
                pmsTotalProjectCost,
                networkMilesForSurvey;
            //Set Grant amount (max 100k, min 15k)
            pmsGrantAmount = app.checkInputLimits(pmsGrantAmount, 'pms_grantamount');
            $("#pms_grantamount").val(pmsGrantAmount);
            //Set percentage of network covered by grant amount
            networkTotalPercentage = app.checkInputLimits(networkTotalPercentage, 'percentage');
            $("#network_totalpercentage").val(networkTotalPercentage);
            //Set miles remaining after grant amount used
            app.networkMilesRemaining = app.checkInputLimits(networkMilesRemaining, 'network_milesremaining');
            $("#network_milesremaining").val(app.networkMilesRemaining);

            //Set miles that will be surveyed with grant amount (max 333.33)
            networkMilesForSurvey = app.checkInputLimits(miles, 'network_milesforsurvey');
            $("#network_milesforsurvey").val(networkMilesForSurvey);
            //Set local contribution (20% of grant amount)
            pmsLocalContribution = app.checkInputLimits(pmsLocalContribution, 'pms_localcontribution');
            $("#pms_localcontribution").val(pmsLocalContribution);

            //Last inpspection date and total miles from json Array
            $("#last_major_inspection").val(date);
            $("#network_centerlinemiles").val(miles);
        },
        additionalFunds: function() {
            $("#network_additionalfunds").on('input', function() {
                var totalMiles = $("#network_centerlinemiles").val();
                var milesRemaining = app.networkMilesRemaining;
                var percentNetwork = $("#network_totalpercentage").val();
                var additonalFunds = parseFloat($(this).val());
                var additionalMilesFunded = additonalFunds / 300;
                var newRemainingMiles = milesRemaining - additionalMilesFunded;
                var newPercentageNetwork = (100 * (totalMiles - newRemainingMiles) / totalMiles) + percentNetwork;

                //Check if additional funds is empty
                additonalFunds = app.checkInputLimits(additonalFunds, 'additional_funds');
                $("#network_percentadditionalfunds").val(additonalFunds);
                //Set Percentage of Network covered by grant plus additional funds
                newPercentageNetwork = app.checkInputLimits(newPercentageNetwork, 'percentage');
                $("#network_percentadditionalfunds").val(newPercentageNetwork);
                //Set network miles remaining after additional funds
                newRemainingMiles = app.checkInputLimits(newRemainingMiles, 'network_milesremaining');
                $("#network_milesremaining").val(newRemainingMiles);
                //Set additional funds in section 4 summary
                console.log('additional funds' + additonalFunds);
                $("#pms_additionalfunds").val(additonalFunds);

                //Set total project cost in section 4 summary
                var pmsTotalProjectCost = parseFloat($("#pms_additionalfunds").val()) + parseFloat($("#pms_grantamount").val());
                $("#pms_totalprojectcost").val(pmsTotalProjectCost);
            });


        },
        checkInputLimits: function(value, field) {
            value = parseFloat(value);
            console.log(value);
            console.log(field);

            switch (field) {
                case 'percentage':
                    if (value <= 0) {
                        return 0;
                    } else if (value > 0 && value <= 100) {
                        return value;
                    } else {
                        return 100;
                    }
                    break;
                case 'pms_grantamount':
                    if (value <= 15000) {
                        return 15000;
                    } else if (value > 15000 && value <= 100000) {
                        return value;
                    } else {
                        return 100000;
                    }
                    break;
                case 'network_milesremaining':
                    if (value <= 0 || isNaN(value) === true) {
                        return 0;
                    } else {
                        return value;
                    }
                    break;
                case 'network_milesforsurvey':
                    if (value <= 333.33) {
                        return value;
                    } else {
                        return 333.33;
                    }
                    break;
                case 'pms_localcontribution':
                    if (value <= 333.33) {
                        return value;
                    } else {
                        return 20000;
                    }
                    break;
                case 'additional_funds':
                    if (value <= 0) {
                        return 0;
                    } else if (isNaN(value) === true) {
                        return 0;
                    } else {
                        return value;
                    }
                    break;
            }


        },
        resetForms: function() {
            //Reset all inputs except dropdown list
            $(':input', '.form-reset')
                .not(':button, :submit, :reset, :hidden, #jurisdiction')
                .val('')
                .removeAttr('checked')
                .removeAttr('selected');
        },
		post: function(form, attr, projectId){
			$(form).parsley().on('form:success', function() {
				$.post('/api/application' + attr + projectId, $(form).serialize());
				console.log('pass');
			});
		}
    };
    app.init();
})();
