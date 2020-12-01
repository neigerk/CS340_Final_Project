module.exports = function(){
    var express = require('express');
    var router = express.Router();

    var handlebars = require('handlebars');
    handlebars.registerHelper("setVar", function(varName, varValue, options) {
        options.data.root[varName] = varValue;
    });


    function getPizza(res, mysql, context, complete){
        mysql.pool.query("SELECT pizzaID as pid, pizza_name FROM Pizzas", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.pizza = results;
            complete();
        });
    }

    function getCustomer(res, mysql, context, complete){
        mysql.pool.query("SELECT customerID AS cid, first_name, last_name", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customer = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtersales.js","deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPizza(res, mysql, context, complete);
        getCustomer(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('neworder', context);
            }

        }
    });

    router.post('/', function(req, res){
//        console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Orders (order_price, date, CID, order_status) VALUES (?,?,?,?)";
        var inserts = [req.body.first_name, req.body.last_name, req.body.cid, "ORDERED"];
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
