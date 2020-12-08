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
  // p2 = document.getElementById('pizza2');
  // p3 = document.getElementById('pizza3');
  if (p1.value !== ''){
    console.log("p1.value:" + p1.value);
    console.log("p1.response:" + getPrice(p1.value, p1_quantity, p1_price_field));
  }
  if (p2.value !== ''){
    console.log("p2.value:" + p2.value);
    console.log("p2.response:" + getPrice(p2.value, p2_quantity, p2_price_field));
  }
  if (p3.value !== ''){
    console.log("p3.value:" + p3.value);
    console.log("p3.response:" + getPrice(p3.value, p3_quantity, p3_price_field));
  }
  // console.log(getPrice(p1.value));
  // console.log(getPrice(p2.value));
  // console.log(getPrice(p3.value));
  // console.log(getPrice(p1.value));
  // console.log(getPrice(p2.value));
  // console.log(getPrice(p3.value));
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
        var p4 = event.target.response;
        console.log(event.target.response.price);
        return event.target.response;

      }
    });
    getRequest.send();
}
