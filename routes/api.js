var express = require('express'),
    router = express.Router(),
    feedbackData = require('../data/feedback.json'),
    fs = require('fs'),
    bodyParser = require('body-parser');

router.get('/api', function(req, res) {
    res.json(feedbackData)
})

// parse application/json
router.use(bodyParser.json())

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/api', function(req, res) {
    feedbackData.unshift(req.body)
    fs.writeFile('data/feedback.json', JSON.stringify(feedbackData) , 'utf-8' ,
        function(err){
            if(err) {
                console.log(err);
            }
        }
    );
    res.json(feedbackData)
})
router.delete('/api/:id', function(req, res) {
    feedbackData.splice(req.params.id, 1);
    fs.writeFile('data/feedback.json', JSON.stringify(feedbackData) , 'utf-8' ,
        function(err){
            if (err) {
                    console.log(err);
            }
        }
    );
    res.json(feedbackData)
})
module.exports = router;
