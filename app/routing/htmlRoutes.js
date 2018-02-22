var path = require('path');

module.exports = function (app) {
    // route for survey page
    app.get('/survey', function(req,res){
        res.sendFile(path.join(__dirname + "/../public/survey.html"))
    });
    // default catch-all home route
    app.use( function(req,res) {
        res.sendFile(path.join(__dirname + "/../public/home.html"))
    });

}