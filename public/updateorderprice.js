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
  p1 = document.getElementById('pizza1');
  p2 = document.getElementById('pizza2');
  p3 = document.getElementById('pizza3');
  if (p1.value !== ''){
    console.log("p1.value:" + p1.value);
    console.log("p1.response:" + getPrice(p1.value));
  }
  if (p2.value !== ''){
    console.log("p2.value:" + p2.value);
    console.log("p2.response:" + getPrice(p2.value));
  }
  if (p3.value !== ''){
    console.log("p3.value:" + p3.value);
    console.log("p3.response:" + getPrice(p3.value));
  }
  // console.log(getPrice(p1.value));
  // console.log(getPrice(p2.value));
  // console.log(getPrice(p3.value));
  // console.log(getPrice(p1.value));
  // console.log(getPrice(p2.value));
  // console.log(getPrice(p3.value));
}

function getPrice(pizzaID){
    var getRequest = new XMLHttpRequest();
    var requestURL = 'neworder/get/' + pizzaID;
    getRequest.open('GET', requestURL);

    getRequest.addEventListener('load', function (event) {
      if (event.target.status !== 200) {
        var responseBody = event.target.response;
        alert("Error accessing pizza prices " + responseBody);
      } else {
        var p4 = event.target.response;
        return event.target.response;
      }
    });
    getRequest.send();
}
