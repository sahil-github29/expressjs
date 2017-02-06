var express = require('express'),
    app = express(),
    reload = require('reload'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    dataFile = require('./data/data.json'),
    bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json())

/* Note: all the session stuff happens after the body parser */
/* Cookie parser :
    looks in the header in between the client and server transactions and read those headers
    and parsses out the cookies that are being sent
    it save cookies in "req.cookies"
 */
app.use(cookieParser());

/* Express Session :
    express-session allows us to authenticate transactions between the clien and the server.
    it lets the server know that the client is the same persion it has been talking to

    secret: your key (salt)
    saveUninitialie: It initializes the session even when it is not modified.
*/

app.use(session({secret: 'sahil' , saveUninitialized: true, resave: true}));
//app.use(require('./routes/checkSession'))
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
