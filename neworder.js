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

    // router.get('/filter/:start_date/:end_date', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["filterpizzas.js","deleteperson.js","filterpeople.js","searchpeople.js"];
    //     var mysql = req.app.get('mysql');
    //     getPizzasbyDate(req, res, mysql, context, complete);
    //     // getPeoplebyHomeworld(req,res, mysql, context, complete);
    //     // getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 1){
    //             res.render('browsepizzasales', context);
    //         }
    //
    //     }
    // });

    // function getPizzasbyDate(req, res, mysql, context, complete){
    //   var format_start = req.params.start_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
    //   var format_end = req.params.end_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
    //   var query = "SELECT Orders.date, Pizzas.pizza_name AS Pizza_Name, COUNT(Pizzas.pizzaID) * Pizzas_Orders.quantity AS Quantity, Pizzas.pizza_price * SUM(Pizzas_Orders.quantity) AS Revenue FROM Orders INNER JOIN Pizzas_Orders ON Orders.orderID = Pizzas_Orders.orderID INNER JOIN Pizzas ON Pizzas_Orders.pizzaID = Pizzas.pizzaID WHERE Orders.date BETWEEN '" + format_start + "' AND '"+ format_end + "' GROUP BY Pizza_Name, Orders.date ORDER BY Orders.date"
    //   console.log(query);
    //   console.log(req.params)
    //   console.log(format_start + " " + format_end);
    //   var inserts = [format_start, format_end]
    //   //console.log(inserts)
    //   // mysql.pool.query(query, inserts, function(error, results, fields){
    //   mysql.pool.query(query, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.pizzas = results;
    //         complete();
    //     });
    // }

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
        console.log("results: " + results);
        console.log("results.price: " + results.price);
        console.log("results[0].price: " + results[0].price);
        //console.log("results[1].price: " + results[1].price);
        console.log("results[0]: " + results[0]);
        //console.log("results[1]: " + results[1]);

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
