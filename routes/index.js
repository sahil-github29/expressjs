var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    var data = req.app.get('appData'),
        pageSpeakers = data.speakers;
        pagePhotos = [];

     data.speakers.forEach(function(item){
         pagePhotos = pagePhotos.concat(item.artwork)
     });

    res.render('index' , {
        pageTitle : 'Home ',
        artwork : pagePhotos,
        speakers : pageSpeakers,
        pageID : 'home'
    })
})
module.exports = router;
