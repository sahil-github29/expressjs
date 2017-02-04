var express = require('express'),
    router = express.Router();

router.get('/welding', function(req, res) {
    var data = req.app.get('appData');
    res.render('welding', {dataFile:data, pageTitle:"welding" })

    // var data = req.app.get('appData'),
    //     pageSpeakers = data.speakers;
    //     pagePhotos = [];
    //
    //  data.speakers.forEach(function(item){
    //      pagePhotos = pagePhotos.concat(item.artwork)
    //  });
    //
    // res.render('index' , {
    //     pageTitle : 'Home ',
    //     artwork : pagePhotos,
    //     speakers : pageSpeakers,
    //     pageID : 'home'
    // })
})
module.exports = router;
