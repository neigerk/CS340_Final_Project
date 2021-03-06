module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // function getPlanets(res, mysql, context, complete){
    //     mysql.pool.query("SELECT planet_id as id, name FROM bsg_planets", function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.planets  = results;
    //         complete();
    //     });
    // }
    //
    // function getPeople(res, mysql, context, complete){
    //     mysql.pool.query("SELECT bsg_people.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id", function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.people = results;
    //         complete();
    //     });
    // }

    // function getPizza(res, mysql, context, complete){
    //     mysql.pool.query("SELECT Orders.date, Pizzas.pizza_name AS Pizza_Name, COUNT(Pizzas.pizzaID) AS Quantity, SUM(Pizzas.pizza_price) AS Revenue FROM Orders INNER JOIN Pizzas_Orders ON Orders.orderID = Pizzas_Orders.orderID INNER JOIN Pizzas ON Pizzas_Orders.pizzaID = Pizzas.pizzaID GROUP BY Pizza_Name, Orders.date ORDER BY Orders.date", function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.pizzas = results;
    //         complete();
    //     });
    // }

    /*
    SELECT Orders.date, Toppings.topping_name AS Topping_Name, COUNT(Toppings.toppingID) AS Quantity
    FROM Orders
    JOIN Pizzas_Orders ON Orders.orderID = Pizzas_Orders.orderID
    JOIN Pizzas ON Pizzas_Orders.pizzaID = Pizzas.pizzaID
    JOIN Pizzas_Toppings ON Pizzas.pizzaID = Pizzas_Toppings.pizzaID
    JOIN Toppings ON Pizzas_Toppings.toppingID = Toppings.toppingID
    WHERE Orders.date > :start_date_input AND Orders.date < :end_date_input
    GROUP BY Toppings.topping_name, Orders.date
    ORDER BY Orders.date
    */


    function getToppingUsage(res, mysql, context, complete){
        mysql.pool.query("SELECT Orders.date, Toppings.topping_name AS Topping_Name, COUNT(Toppings.toppingID) AS Quantity FROM Orders JOIN Pizzas_Orders ON Orders.orderID = Pizzas_Orders.orderID JOIN Pizzas ON Pizzas_Orders.pizzaID = Pizzas.pizzaID JOIN Pizzas_Toppings ON Pizzas.pizzaID = Pizzas_Toppings.pizzaID JOIN Toppings ON Pizzas_Toppings.toppingID = Toppings.toppingID GROUP BY Toppings.topping_name, Orders.date ORDER BY Orders.date", function(error, results, fields){


            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.toppings = results;
            complete();
        });
    }

    function getToppingUsagebyDate(req, res, mysql, context, complete){
      var format_start = req.params.start_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
      var format_end = req.params.end_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
      var query = "SELECT Orders.date, Toppings.topping_name AS Topping_Name, COUNT(Toppings.toppingID) AS Quantity FROM Orders JOIN Pizzas_Orders ON Orders.orderID = Pizzas_Orders.orderID JOIN Pizzas ON Pizzas_Orders.pizzaID = Pizzas.pizzaID JOIN Pizzas_Toppings ON Pizzas.pizzaID = Pizzas_Toppings.pizzaID JOIN Toppings ON Pizzas_Toppings.toppingID = Toppings.toppingID WHERE Orders.date BETWEEN '" + format_start + "' AND '"+ format_end + "' GROUP BY Toppings.topping_name, Orders.date ORDER BY Orders.date"
      console.log(query);
      console.log(req.params)
      console.log(format_start + " " + format_end);
      var inserts = [format_start, format_end]
      //console.log(inserts)
      // mysql.pool.query(query, inserts, function(error, results, fields){
      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.toppings = results;
            complete();
        });
    }

    // /* Find people whose fname starts with a given string in the req */
    // function getPeopleWithNameLike(req, res, mysql, context, complete) {
    //   //sanitize the input as well as include the % character
    //    var query = "SELECT bsg_people.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_people.fname LIKE " + mysql.pool.escape(req.params.s + '%');
    //   console.log(query)
    //
    //   mysql.pool.query(query, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.people = results;
    //         complete();
    //     });
    // }
    //
    // function getPerson(res, mysql, context, id, complete){
    //     var sql = "SELECT character_id as id, fname, lname, homeworld, age FROM bsg_people WHERE character_id = ?";
    //     var inserts = [id];
    //     mysql.pool.query(sql, inserts, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.person = results[0];
    //         complete();
    //     });
    // }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtertoppings.js"];
        var mysql = req.app.get('mysql');
        getToppingUsage(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('browsetoppingusage', context);
            }

        }
    });

    /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    router.get('/filter/:start_date/:end_date', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtertoppings.js"];
        var mysql = req.app.get('mysql');
        getToppingUsagebyDate(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('browsetoppingusage', context);
            }

        }
    });

    /*Display all people whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    /*
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPeopleWithNameLike(req, res, mysql, context, complete);
        getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('people', context);
            }
        }
    });
    */

    /* Display one person for the specific purpose of updating people */

    /*
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedplanet.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getPerson(res, mysql, context, req.params.id, complete);
        getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-person', context);
            }

        }
    });
    */

    /* Adds a person, redirects to the people page after adding */

    /*
    router.post('/', function(req, res){
        console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES (?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/people');
            }
        });
    });
    */

    /* The URI that update data is sent to in order to update a person */

    /*
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE bsg_people SET fname=?, lname=?, homeworld=?, age=? WHERE character_id=?";
        var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });*/

    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    /*
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM bsg_people WHERE character_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })*/

    return router;
}();
