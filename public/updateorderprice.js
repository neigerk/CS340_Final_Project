// function updatePrice(){
//     $.ajax({
//         url: '/neworder/',
//         type: 'PUT',
//         data: $('#add-new-order').serialize(),
//         success: function(result){
//             window.location.replace("/");
//         }
//     })
// };

function updatePrice(){
  var p1 = document.getElementById('pizza1');
  var p1_quantity = document.getElementById('pizza1_quantity');
  var p1_price_field = document.getElementById('pizza1_cost');
  var p2 = document.getElementById('pizza2');
  var p2_quantity = document.getElementById('pizza2_quantity');
  var p2_price_field = document.getElementById('pizza2_cost');
  var p3 = document.getElementById('pizza3');
  var p3_quantity = document.getElementById('pizza3_quantity');
  var p3_price_field = document.getElementById('pizza3_cost');
  if (p1.value !== ''){
    getPrice(p1.value, p1_quantity, p1_price_field);
  }
  if (p2.value !== ''){
    getPrice(p2.value, p2_quantity, p2_price_field);
  }
  if (p3.value !== ''){
    getPrice(p3.value, p3_quantity, p3_price_field);
  }
}

function getPrice(pizzaID, quantity, field){
    var getRequest = new XMLHttpRequest();
    var requestURL = 'neworder/get/' + pizzaID;
    getRequest.open('GET', requestURL);

    getRequest.addEventListener('load', function (event) {
      if (event.target.status !== 200) {
        var responseBody = event.target.response;
        alert("Error accessing pizza prices " + responseBody);
      } else {
        var obj = JSON.parse(event.target.response);
        var price = obj.price * quantity.value;
        field.innerHTML = "$"+price.toString();
        // console.log(obj);
        // console.log(obj.price);
        // console.log(event.target.response);
        // console.log(event.target.response.price);
      }
    });
    getRequest.send();
}
