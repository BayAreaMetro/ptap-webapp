(function() {

    var app = {

        init: function() {
            $('.closer ').click(app.toggleForm);
            //Launch accordion
            app.accordion();
            app.projectid = uuid.v1();
            app.findAndSubmit(); //Submit current Form
            app.loadJurisdictions();
            app.change();
            app.additionalFunds();
            app.checkProjectOptions();
            app.radioButtonsCheck();
           // app.loadtestvalues();
            app.formTabs();
            app.projectTypeSelection();

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
                app.validate(formId, submitAttr);

                //Submit form
                // app.post(formId, submitAttr, app.projectId);
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
        validate: function(currentForm, submitAttr) {

            //Pass current form id and then validate
            // $(currentForm).parsley().validate();
            app.post(currentForm, submitAttr, app.projectId);
        },
        onselect: function(e) {
            var dataItem = this.dataItem(e.item);
            var vals = app.Jurisdictions;
            var lookupVal = dataItem.Jurisdiction;
            for (var i = vals.length - 1; i >= 0; i--) {
                if (vals[i].Jurisdiction === lookupVal) {
                    //Autopopulate values
                    $('#network_centerlinemiles').val(vals[i]['Total Centerline Miles']);
                    $('#last_major_inspection').val(vals[i]['Last Major Inspection']);
                }
            }
        },
        dropDown: function(data) {
            var sourceArr = [];

            for (var i = 0; i < data.length; i++) {
                sourceArr.push(data[i].Jurisdiction);
                //$("#jurisdiction").append('<option>' + data[i].Jurisdiction + '</option>');
                $("#jurisdiction").append('<option data-date=' + data[i]['Last Major Inspection'] + ' data-miles=' + data[i]['Total Centerline Miles'] + '>' + data[i].Jurisdiction + '</option>');
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

                //Set miles globally
                app.centerLineMiles = dataMiles;

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

            //Set Application Date
            var applicationdate = moment(new Date()).format("MMM Do YYYY");
            $("#applicationdate").val(applicationdate);

        },
        additionalFunds: function() {
            //Option 1 Additional Funds Input
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

            //Option 2 Additional Funds Input
            $("#option2_additionalfunds").on('input', function() {
                var option2AdditionalFunds = $(this).val();
                var option2LocalContribution = (app.centerLineMiles * 300) * 0.2;
                option2AdditionalFunds = app.checkInputLimits(option2AdditionalFunds, 'additional_funds');
                $("#npt_additionalfunds").val(option2AdditionalFunds);
                $("#npt_localcontribution").val(option2LocalContribution);

            });

            //Option 3 Additional Funds Input
            $("#option3_additionalfunds").on('input', function() {
                var option3AdditionalFunds = $(this).val();
                var option3LocalContribution = (app.centerLineMiles * 300) * 0.2;
                option3AdditionalFunds = app.checkInputLimits(option3AdditionalFunds, 'additional_funds');
                $("#pdc_additionalfunds").val(option3AdditionalFunds);
                $("#pdc_localcontribution").val(option3LocalContribution);

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
                    if (value <= 20000) {
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
        post: function(form, attr, projectId) {
            console.log(app.projectid);
            console.log(form);
            console.log('checking post');
            if (attr === 'section1') {
                url = '/api/application/' + app.projectid;
            } else {
                url = '/api/application/' + attr + "/" + app.projectid;
            }
            console.log(url);
            console.log($(form).parsley().isValid());

            app.isValid = $(form).parsley().isValid();
            if (app.isValid === true) {
                $.post(url, $(form).serialize());
            } else {
                $(form).parsley().validate();
                $.notify({
                    icon: 'glyphicon glyphicon-warning-sign',
                    title: 'We found some issues on this page!',
                    message: 'Please fix all errors highlighted in red',
                    animate: {
                        enter: 'animated fadeInDown',
                        exit: 'animated fadeOutUp'
                    }
                }, {
                    // settings
                    type: 'danger'
                });
            }

            // $(form).parsley().on('form:success', function() {
            //     $.post(url, $(form).serialize());
            //     console.log('pass');
            // });
        },
        checkProjectOptions: function() {
            $('.check-projects').click(function() {
                var options = $(this).attr('data');
                var checked = $(this).prop('checked');
                var totalcost = app.centerLineMiles * 300;

                totalcost = app.checkInputLimits(totalcost, 'pms_grantamount');

                if (options === 'npa' && checked === true) {
                    $('#update3b').removeClass('hidden');
                    console.log('whats the total cost');
                    console.log(totalcost);
                    //Autopopulate fields
                    //  $("#option2_estimatedcost").val(parseFloat(totalcost));
                    $("#npt_totalprojectcost").val(parseFloat(totalcost));

                } else if (options === 'pdp' && checked === true) {
                    $('#update3c').removeClass('hidden');
                    //Autopopulate fields
                    //   $("#option3_estimatedcost").val(parseFloat(totalcost));
                    $("#pdc_totalprojectcost").val(parseFloat(totalcost));

                } else if (options === 'npa' && checked === false) {
                    $('#update3b').addClass('hidden');
                } else if (options === 'pdp' && checked === false) {
                    $('#update3c').addClass('hidden');

                } else if (options === 'pms' && checked === true) {
                    $('#update3a').removeClass('hidden');

                } else if (options === 'pms' && checked === false) {
                    $('#update3a').addClass('hidden');
                }
            });
        },
        radioButtonsCheck: function() {
            $(".training-radio").change(function() {
                var val = $(this).val();
                if (val === "yes") {
                    $('.training-check').removeClass('hidden');
                } else {
                    $('.training-check').addClass('hidden');
                }
            });

            $(".additionalfunds-radio").change(function() {
                var val = $(this).val();
                console.log(val);
                if (val === "yes") {
                    $('.additionalfunds-check').removeClass('hidden');
                    $('.additionalfunds-check').attr('data-parsley-required').attr('data-parsley-type', 'integer');

                } else {
                    $('.additionalfunds-check').addClass('hidden');
                    $('.additionalfunds-check').removeAttr('data-parsley-required').removeAttr('data-parsley-type');

                }
            });


            $("#contactcheck").click(function() {
                if ($(this).is(':checked')) app.popupateStreetSaver();
            });

            $("#last_major_inspection").datepicker({
                showOtherMonths: true,
                selectOtherMonths: true
            });
        },
        loadtestvalues: function() {
            $("#street_address").val("101 8th st");
            $("#street_address2").val("4");
            $("#city").val("oakland");
            $("#state").val("ca");
            $("#zip").val(94607);
            $("#primary_title").val("None");
            $("#primary_firstname").val("John");
            $("#primary_lastname").val("Smith");
            $("#primary_position").val("GIS");
            $("#primary_phone").val(55555555);
            $("#primary_email").val("john@mtc.ca.gov");

            // $("#streetsaver_firstname").val("John");
            // $("#streetsaver_lastname").val("Smith");
            // $("#streetsaver_position").val("None");
            // $("#streetsaver_phone").val(55555555);
            // $("#streetsaver_email").val("john@mtc.ca.gov");
            // $("#last_user_meeting").val("None");
        },
        toggleForm: function() {
            $(this).closest('.form-hider').toggleClass('notActive');
            $(this).closest('.box-wrapper').toggleClass('notActive');
            //$(".form-hider").toggleClass('notActive');
        },
        formTabs: function() {
            //Initialize tooltips
            $('.nav-tabs > li a[title]').tooltip();

            //Wizard
            $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

                var $target = $(e.target);

                if ($target.parent().hasClass('disabled')) {
                    return false;
                }
            });

            $(".next-step").click(function(e) {
                if (app.isValid === true) {
                    var $active = $('.wizard .nav-tabs li.active');
                    $active.next().removeClass('disabled');
                    app.nextTab($active);
                } else {
                    return false;
                }

            });
            $(".prev-step").click(function(e) {

                var $active = $('.wizard .nav-tabs li.active');
                app.prevTab($active);

            });
        },
        nextTab: function(elem) {
            $(elem).next().find('a[data-toggle="tab"]').click();
        },
        prevTab: function(elem) {
            $(elem).prev().find('a[data-toggle="tab"]').click();
        },
        popupateStreetSaver: function() {
            $("#streetsaver_title").val($("#primary_title").val());
            $("#streetsaver_firstname").val($("#primary_firstname").val());
            $("#streetsaver_lastname").val($("#primary_lastname").val());
            $("#streetsaver_position").val($("#primary_position").val());
            $("#streetsaver_phone").val($("#primary_phone").val());
            $("#streetsaver_email").val($("#primary_email").val());
        },
        projectTypeSelection: function() {
            $('.project-selection').click(function(e) {
                var project = $(this).attr('data');
                var checked = $(this).prop('checked');

                if (checked === true) {
                    switch (project) {
                        case '3a':
                            console.log("3a");
                            $('#li-3a').removeClass('hidden');
                            $('#step3a').removeClass('hidden');
                            break;
                        case '3b':
                            console.log("3b");
                            $('#li-3b').removeClass('hidden');
                            $('#step3b').removeClass('hidden');
                            break;
                        case '3c':
                            console.log('3c');
                            $('#li-3c').removeClass('hidden');
                            $('#step3c').removeClass('hidden');
                    }
                }
                // console.log(project, checked);
            });
        }

    };
    app.init();
})();
