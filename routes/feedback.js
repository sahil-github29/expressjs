var express = require('express'),
    router = express.Router();

router.get('/feedback', function(req, res) {
    res.render('feedback' , {
        pageTitle : 'Feedback',
        pageID : 'feedback'
    })
})
module.exports = router;
