var express = require('express'),
    dataFile = require('./data/data.json'),
    app = express(),
    reload = require('reload'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    path = require('path'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    passport = require('passport'),
    passportLocal = require('passport-local'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose');
    
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/speakers')
var db = mongoose.connection;



// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

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
app.use(session({
    secret: 'sahil',
    saveUninitialized: true,
    resave: true
}));

/* Passport initialization    */
app.use(passport.initialize())
app.use(passport.session())

/* Express validator */
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

/* connect flash */
app.use(flash())

/* Global variable for flash messages */
app.use(function(req, res, next) {
    app.locals.success_msg = req.flash('success_msg')
    app.locals.error_msg = req.flash('error_msg')

    // passport sets its own flash messages
    // so we set it here
    app.locals.error = req.flash('error')

    next();
})


/* Routes */
app.use(require('./routes/index'))
app.use(require('./routes/registration'))
app.use(require('./routes/speakers'))
app.use(require('./routes/feedback'))
app.use(require('./routes/api'))
app.use(require('./routes/owner'))
app.use(require('./routes/login'))

/* adding static files folder */
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)
app.set('appData', dataFile)
app.set('view engine', 'ejs')
app.set('views', 'views')

/* Global veriables */
app.locals.siteTitle = 'Academy'
app.locals.allSpeakers = dataFile.speakers;

var server = app.listen(app.get('port'), function() {
    console.log("Listening on port " + app.get('port'));
})

reload(server, app)
