function updatePrice(res, mysql) {
    var pizza1 = document.getElementById('p1').value;
    var pizza2 = document.getElementById('p2').value;
    var pizza3 = document.getElementById('p3').value;
    var price1 = 0.0;
    var price2 = 0.0;
    var price3 = 0.0;
    var total_price = document.getElementById('totalPrice').innerHTML;

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

    document.getElementById('total_price').innerHTML = Number(total_price) + price3 + price2 + price1;
}
