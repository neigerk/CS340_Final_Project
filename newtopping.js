module.exports = function(){
    var express = require('express');
    var router = express.Router();


    // function getPizza(res, mysql, context, complete){
    //
    //     mysql.pool.query("SELECT pizzaID AS id, pizza_name FROM Pizzas", function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.pizza = results;
    //         complete();
    //     });
    // }


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtersales.js","deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        res.render('newtopping', context);
        // getPizza(res, mysql, context, complete);
        // function complete(){
        //     callbackCount++;
        //     if(callbackCount >= 1){
        //         res.render('newcustomer', context);
        //     }
        //
        // }
    });

    router.post('/', function(req, res){
//        console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Toppings (topping_name, topping_type, topping_price) VALUES (?, ?, ?);";
        var inserts = [req.body.topping_name, req.body.topping_type, req.body.topping_price];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('./');
            }
        });
    });

    return router;
}();
