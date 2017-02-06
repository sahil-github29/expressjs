var checkSession = function(req, res, next) {
    if (!req.session.username) {
        res.render('login' , {
            pageTitle : 'Login',
            pageID : 'login'
        })
    }
    next();
}
module.exports = checkSession;
