var PTAP = {
    init: function() {
        PTAP.loadReport();
        PTAP.downloadData();
    },
    loadReport: function() {

        var oTable = $('#jsontable').DataTable({
            "autoWidth": true,
            "searching": true,
            "paging": false,
            "scrollY": 600,
            "scrollCollapse": false,

            dom: 'T<"clear">lfrtip',
            // tableTools: {
            //     "sSwfPath": "../swf/copy_csv_xls_pdf.swf"
            // },
            "sAjaxSource": "/api/application",
            "sAjaxDataProp": "",
            "bProcessing": true,
            "aoColumns": [{
                "mData": "jurisdiction"
            }, {
                "mData": "primary_firstname"
            }, {
                "mData": "primary_lastname"
            }, {
                "mData": "primary_email"
            }, {
                "mData": "network_centerlinemiles"
            }, {
                "mData": "network_totalpercentage"
            }, {
                "mData": "pms_totalprojectcost"
            }, {
                "mData": "applicationdate"
            }]

            //"order": [[3, "asc"]] row.field.name + ' ' + row.id
        });

    },
    downloadData: function() {
        $('.btn-download').click(function(e) {
            e.preventDefault();
            $.get('/api/application/download', function(response) {
                console.log(response);
                if (response[0].file) {
                    window.location.href = '/downloads/' + response[0].file;
                }
            });
        });
    }

};

$(document).ready(PTAP.init);
