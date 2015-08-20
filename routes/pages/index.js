var express = require('express');
var router = express.Router();


//console.log('getting pages');
/* GET home page. */
//Define Index Page with authentication parameter
router.get('/', function (req, res) {
    
        res.render('pages/index');
});

/* GET reports page. */
router.get('/reports', function (req, res) {
    
        res.render('pages/reports');
});


module.exports = router;
