//import express 
let express = require("express");

//Initialize the app
let app = express();
app.use(express.urlencoded({extended:true}));

let router = require('./routesAdil');

app.use('/', router);

//launch app to listen to specified port 
app.listen(8000,function(){
    console.log("Running on port 8000");
});
