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

                //submit form
                app.validate(formId);
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
            var pmsGrantAmount = miles * 300,
                networkTotalPercentage = 100 - (100 * (miles - 333.33) / miles),
                networkMilesRemaining = miles - 333.33,
                pmsLocalContribution = pmsGrantAmount * 0.2,
                pmsTotalProjectCost;

            if (miles <= 50) {
                $("#pms_grantamount").val(15000);
                $("#network_totalpercentage").val(100);
                $("#network_milesforsurvey").val(miles);
                $("#network_milesremaining").val(0);
                $("#pms_localcontribution").val(pmsLocalContribution);
            } else if (miles > 50 && miles <= 333.33) {
                $("#pms_grantamount").val(pmsGrantAmount);
                $("#network_totalpercentage").val(100);
                $("#network_milesforsurvey").val(miles);
                $("#network_milesremaining").val(0);
                $("#pms_localcontribution").val(pmsLocalContribution);
            } else {
                $("#pms_grantamount").val(100000);
                $("#network_totalpercentage").val(networkTotalPercentage);
                $("#network_milesforsurvey").val(333.33);
                $("#network_milesremaining").val(networkMilesRemaining);
                $("#pms_localcontribution").val(20000);

            }
            $("#last_major_inspection").val(date);
            $("#network_centerlinemiles").val(miles);
        }
    };
    app.init();
})();
