var express = require('express'),
    router = express.Router();

router.get('/speakers', function(req, res) {
    var data = req.app.get('appData'),
        pagePhotos = [],
        pageSpeakers = data.speakers;

     data.speakers.forEach(function(item){
         pagePhotos = pagePhotos.concat(item.artwork)
     });

    res.render('speakers' , {
        pageTitle : 'Speakers',
        artwork : pagePhotos,
        speakers : pageSpeakers,
        pageID : 'speakerList'
    })
});
router.get('/speakers/:speakerid', function(req, res) {
    var data = req.app.get('appData'),
        pagePhotos = [],
        pageSpeakers = [];

     data.speakers.forEach(function(item){
         if(item.shortname == req.params.speakerid) {
             pageSpeakers.push(item)
             pagePhotos = pagePhotos.concat(item.artwork)
         }
     });
    res.render('speakers' , {
        pageTitle : 'Speakers Info',
        artwork : pagePhotos,
        speakers : pageSpeakers,
        pageID : 'speakerDetail'
    })
});

module.exports = router;
