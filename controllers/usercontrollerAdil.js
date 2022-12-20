var mysql = require("mysql");
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'academy'

});

exports.form = function(req, res){
    connection.query("select * from formation;", function(error, result){
        if (error) console.log(error);
    res.render('home.ejs', {academy: result});
    });
}
