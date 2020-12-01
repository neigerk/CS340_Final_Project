/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
//Example Code
app.use('/people_certs', require('./people_certs.js'));
app.use('/people', require('./people.js'));
app.use('/planets', require('./planets.js'));
//Ours
app.use('/newcustomer', require('./newcustomer.js'));
app.use('/neworder', require('./neworder.js'));
app.use('/newpizza', require('./newpizza.js'));
app.use('/newtopping', require('./newtopping.js'));
app.use('/browsepizzasales', require('./browsepizzasales.js'));
app.use('/browsetoppingusage', require('./browsetoppingusage.js'));
app.use('/browsecustomerorder', require('./browsecustomerorder.js'));
app.use('/browsesalestotal', require('./browsesalestotal.js'));
app.use('/updatecustomer', require('./updatecustomer.js'));
app.use('/cancelorder', require('./cancelorder.js'));
app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
