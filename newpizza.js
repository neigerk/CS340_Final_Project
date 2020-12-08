module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getTopping(res, mysql, context, complete){

        mysql.pool.query("SELECT toppingID AS id, topping_name FROM Toppings", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.topping = results;
            complete();
        });
    }


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtersales.js","deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getTopping(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('newpizza', context);
            }

        }
    });

    router.post('/', function(req, res){
//        console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Pizzas (pizza_name, pizza_price) VALUES (?, ?)";
        var inserts = [req.body.pizza_name, Number(req.body.pizza_price)];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('./');
            }
        });

//        var sql2 = "INSERT INTO Pizzas_Toppings (pizzaID, toppingID) VALUES(?, ?)";
//        var inserts2 = [];

    });

    return router;
}();