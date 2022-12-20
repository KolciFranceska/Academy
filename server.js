//Import express
let express = require('express');

//Initiate the app
let app = express();

app.use(express.urlencoded({ extended: true }));

var mysql = require('mysql');
//Database connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'academy'
});
connection.connect(function (error) { if (error) console.log(error);});

//Send message for default URL
// app.get('/', (req, res) => {
//     res.send('Hello World! ');
// });

//Send list of users for default URL
app.get('/', (req, res) => {
    connection.query('select * from user;', function (error, result) {
        if (error) console.log(error);
        res.render('userList.ejs', {users : result});
    });
});

//Send Message
app.get('/add', (req, res) => {
    res.render('userAdd.ejs');
});

//Save user in db
app.post('/', (req, res) => {
    let user ={"lastname":req.body.lastname, "firstname":req.body.firstname};
    connection.query('insert into user set ?', user, function (err, result) {
        if (err) console.log(err);
        res.redirect('/');
    });
});

//Send update form
app.get('/update/:i', (req, res) => {
    let i = req.params.i;
    connection.query('select * from user WHERE iduser = ?;',i ,  function (error, result) {
        if (error) console.log(error);
        res.render('userUpdate.ejs', {"iduser" : result[0].iduser, "lastname": result[0].lastname,"firstname": result[0].firstname});
    });
});
    
//Update user in db
app.post('/update', (req, res) => {
    let i = req.body.iduser;
    let user ={"lastname":req.body.lastname, "firstname":req.body.firstname};
    connection.query('UPDATE user SET ? WHERE iduser = ?', [user,i], function (err, result) {
        if (err) console.log(err);
        res.redirect('/');
    });
});

//Delete user
app.get('/delete/:i', (req, res) => {
    let i = req.params.i;
    connection.query('DELETE from user WHERE iduser = ?;',i ,  function (error, result) {
        if (error) console.log(error);
        res.redirect('/');
    });
});

//Launch app to listen to specified port
app.listen(80, function () {
    console.log("Running on port 80");
});
