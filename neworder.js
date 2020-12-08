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


    function getPrice(mysql, pizzaID){
        var query = "SELECT Pizzas.pizza_price AS price FROM Pizzas WHERE pizzaID = " + pizzaID;

        mysql.pool.query(query, function(error, results, fields){
          if(error){
            res.write(JSON.stringify(error));
            res.end();
          }
          return results[0].price;
        })
    }

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body);
        console.log(req);
        var today = new Date().toISOString().slice(0,10);
        console.log(today);
        var customer = req.body.customer;
        var total = 0;
        var p1 = req.body.pizza1;
        var p2 = req.body.pizza2;
        var p3 = req.body.pizza3;
        if(p1 !== ''){
          var p1_quantity = req.body.pizza1_quantity;
          var p1_price = getPrice(mysql, p1);
          console.log("p1_price: " + p1_price);
          total = Number(total) + (Number(p1_quantity) * Number(p1_price));
        }
        if(p2 !== ''){
          var p2_quantity = req.body.pizza1_quantity;
          var p2_price = getPrice(mysql, p2);
          console.log("p1_price: " + p2_price);
          total = Number(total) + (Number(p2_quantity) * Number(p2_price));
        }
        if(p3 !== ''){
          var p3_quantity = req.body.pizza1_quantity;
          var p3_price = getPrice(mysql, p3);
          console.log("p1_price: " + p3_price);
          total = Number(total) + (Number(p3_quantity) * Number(p3_price));
        }


        var sql = "INSERT INTO Orders (order_price, date, CID, order_status) VALUES (?,?,?,?)";
        var inserts = [total, today, req.body.customer, "ORDERED"];
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



    function getPizzaPrice(req, res, mysql, context, complete){
      console.log(req.params);
      var query = "SELECT Pizzas.pizza_price AS price FROM Pizzas WHERE pizzaID = " + req.params.pizzaID;
      console.log(query);

      mysql.pool.query(query, function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.price = results[0].price;
        complete();
      })
    }

    router.get('/get/:pizzaID', function(req, res){
      var callbackCount = 0;
      var mysql = req.app.get('mysql');
      var context = {};
      getPizzaPrice(req, res, mysql, context, complete);
      function complete(){
        callbackCount++;
        if(callbackCount >= 1){
          console.log(context);
          res.json(context);
        }
      }
    })

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
