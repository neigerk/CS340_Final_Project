module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getPizza(res, mysql, context, complete){
        mysql.pool.query("SELECT pizzaID as pid, pizza_name, pizza_price FROM Pizzas", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.pizza = results;
            complete();
        });
    }

    function getCustomer(res, mysql, context, complete){
        mysql.pool.query("SELECT customerID AS cid, first_name, last_name FROM Customers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customer = results;
            complete();
        });
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateorderprice.js","deleteperson.js","filterpeople.js","searchpeople.js"];
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
        var inserts = [Number(req.body.total_price), today, req.body.cid, "ORDERED"];
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

    router.put('/', function(res, req, mysql) {
        var pizza1 = req.body.p1; //document.getElementById('p1').value;
        var pizza2 = req.body.p2; //document.getElementById('p2').value;
        var pizza3 = req.body.p3; //document.getElementById('p3').value;
        var price1 = 0.0;
        var price2 = 0.0;
        var price3 = 0.0;
        var total_price = req.body.total_price; //document.getElementById('total_price').innerHTML;
    
        mysql.pool.query("SELECT pizza_price FROM Pizzas WHERE pizzaID = " + Number(pizza1), function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            price1 = results;
        });
    
        mysql.pool.query("SELECT pizza_price FROM Pizzas WHERE pizzaID = " + Number(pizza2), function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            price2 = results;
        });
    
        mysql.pool.query("SELECT pizza_price FROM Pizzas WHERE pizzaID = " + Number(pizza3), function(error, results){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            price3 = results;
        });
    
        req.body.total_price = Number(total_price) + price3 + price2 + price1;
        res.render('neworder', req.body.total_price);
    });

    return router;
}();
