let express = require('express');

let router = express.Router();
let userController = require('./controllers/userControllerAdil');
router.get('/',(req,res)=>res.redirect('/formation'));

router.get('/formation', userController.form);

module.exports = router;
