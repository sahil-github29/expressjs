var checkSession = function(req, res, next) {
    // if (!req.session.username) {
    //     res.location('http://localhost:3000/')
    //     res.end()
    // } else {
    //   next();
    // }
    if (!req.session.username) {
        res.location('http://localhost:3000/login')
    }
    next();
}
module.exports = checkSession;
