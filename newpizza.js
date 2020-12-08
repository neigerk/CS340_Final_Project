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
            }//else{
             //   res.redirect('./');
            //}
        });

        pid = 8;
        sql = mysql.pool.query("SELECT pizzaID FROM Pizzas WHERE pizza_name = '" + req.body.pizza_name + "'", function(error, results){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{

            pid = results[0].pizzaID;
            console.log(results);
            console.log(pid);

            if(req.body.topping1 == 'NULL'){
                res.redirect('./');
            }else{
            var sql1 = "INSERT INTO Pizzas_Toppings (pizzaID, toppingID) VALUES(?, ?)";
            var inserts1 = [pid, Number(req.body.topping1)];
            sql1 = mysql.pool.query(sql1,inserts1,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }//else{
                 //   res.redirect('./');
                //}
            });
            }

            if(req.body.topping2 == 'NULL'){
                res.redirect('./');
            }else{
            var sql2 = "INSERT INTO Pizzas_Toppings (pizzaID, toppingID) VALUES(?, ?)";
            var inserts2 = [pid, Number(req.body.topping2)];
            sql2 = mysql.pool.query(sql2,inserts2,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }//else{
                 //   res.redirect('./');
                //}
            });
            }

            if(req.body.topping3 == 'NULL'){
                res.redirect('./');
            }else{
            var sql3 = "INSERT INTO Pizzas_Toppings (pizzaID, toppingID) VALUES(?, ?)";
            var inserts3 = [pid, Number(req.body.topping3)];
            sql3 = mysql.pool.query(sql3,inserts3,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }//else{
                 //   res.redirect('./');
                //}
            });
            }

            if(req.body.topping4 == 'NULL'){
                res.redirect('./');
            }else{
            var sql4 = "INSERT INTO Pizzas_Toppings (pizzaID, toppingID) VALUES(?, ?)";
            var inserts4 = [pid, Number(req.body.topping4)];
            sql4 = mysql.pool.query(sql4,inserts4,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }//else{
                 //   res.redirect('./');
                //}
            });
            }

            if(req.body.topping5 == 'NULL'){
                res.redirect('./');
            }else{
            var sql5 = "INSERT INTO Pizzas_Toppings (pizzaID, toppingID) VALUES(?, ?)";
            var inserts5 = [pid, Number(req.body.topping5)];
            sql5 = mysql.pool.query(sql5,inserts5,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }//else{
                 //   res.redirect('./');
                //}
            });
            }

            }
        });

        // if(req.body.topping1 == 'NULL'){
        //     res.redirect('./');
        // }else{
        // var sql1 = "INSERT INTO Pizzas_Toppings (pizzaID, toppingID) VALUES(?, ?)";
        // var inserts1 = [pid, Number(req.body.topping1)];
        // sql1 = mysql.pool.query(sql1,inserts1,function(error, results, fields){
        //     if(error){
        //         console.log(JSON.stringify(error))
        //         res.write(JSON.stringify(error));
        //         res.end();
        //     }//else{
        //      //   res.redirect('./');
        //     //}
        // });
        // }
        //
        // if(req.body.topping2 == 'NULL'){
        //     res.redirect('./');
        // }else{
        // var sql2 = "INSERT INTO Pizzas_Toppings (pizzaID, toppingID) VALUES(?, ?)";
        // var inserts2 = [pid, Number(req.body.topping2)];
        // sql2 = mysql.pool.query(sql2,inserts2,function(error, results, fields){
        //     if(error){
        //         console.log(JSON.stringify(error))
        //         res.write(JSON.stringify(error));
        //         res.end();
        //     }//else{
        //      //   res.redirect('./');
        //     //}
        // });
        // }
        //
        // if(req.body.topping3 == 'NULL'){
        //     res.redirect('./');
        // }else{
        // var sql3 = "INSERT INTO Pizzas_Toppings (pizzaID, toppingID) VALUES(?, ?)";
        // var inserts3 = [pid, Number(req.body.topping3)];
        // sql3 = mysql.pool.query(sql3,inserts3,function(error, results, fields){
        //     if(error){
        //         console.log(JSON.stringify(error))
        //         res.write(JSON.stringify(error));
        //         res.end();
        //     }//else{
        //      //   res.redirect('./');
        //     //}
        // });
        // }
        //
        // if(req.body.topping4 == 'NULL'){
        //     res.redirect('./');
        // }else{
        // var sql4 = "INSERT INTO Pizzas_Toppings (pizzaID, toppingID) VALUES(?, ?)";
        // var inserts4 = [pid, Number(req.body.topping4)];
        // sql4 = mysql.pool.query(sql4,inserts4,function(error, results, fields){
        //     if(error){
        //         console.log(JSON.stringify(error))
        //         res.write(JSON.stringify(error));
        //         res.end();
        //     }//else{
        //      //   res.redirect('./');
        //     //}
        // });
        // }
        //
        // if(req.body.topping5 == 'NULL'){
        //     res.redirect('./');
        // }else{
        // var sql5 = "INSERT INTO Pizzas_Toppings (pizzaID, toppingID) VALUES(?, ?)";
        // var inserts5 = [pid, Number(req.body.topping5)];
        // sql5 = mysql.pool.query(sql5,inserts5,function(error, results, fields){
        //     if(error){
        //         console.log(JSON.stringify(error))
        //         res.write(JSON.stringify(error));
        //         res.end();
        //     }//else{
        //      //   res.redirect('./');
        //     //}
        // });
        // }

    });

    return router;
}();
