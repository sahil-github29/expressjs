var express = require('express'),
    router = express.Router();

router.get('/owner', function(req, res) {
    res.send('AAA')
})
module.exports = router;
