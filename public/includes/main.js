$('#divlist h5').click(function() {
    $(this).find("i.glyphicon").toggleClass("glyphicon-minus-sign glyphicon-plus-sign");
});

(function() {

    var app = {

        init: function() {
            //Launch accordion
            app.accordion();
            console.log("Workks");
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
        }
    };
    app.init();
})();
