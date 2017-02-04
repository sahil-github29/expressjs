var express = require('express'),
    app = express(),
    reload = require('reload'),
    dataFile = require('./data/data.json');

/* Routes */
app.use(require('./routes/index'))
app.use(require('./routes/speakers'))
app.use(require('./routes/feedback'))
app.use(require('./routes/api'))
app.use(require('./routes/owner'))
app.use(require('./routes/welding'))
app.use(require('./routes/login'))

/* adding static files folder */
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)
app.set('appData', dataFile)
app.set('view engine' , 'ejs')
app.set('views' , 'views')

/* Global veriables */
app.locals.siteTitle = 'Academy'
app.locals.allSpeakers = dataFile.speakers;

var server = app.listen(app.get('port'), function() {
    console.log("Listening on port " + app.get('port'));
})

reload(server, app)
