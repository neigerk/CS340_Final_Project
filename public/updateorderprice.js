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
  p1 = document.getElementById(pizza1).value;
  p2 = document.getElementById(pizza2).value;
  p3 = document.getElementById(pizza3).value;
  console.log(getPrice(p1));
  console.log(getPrice(p2));
  console.log(getPrice(p3));
}

function getPrice(pizzaID){
    var getRequest = new XMLHttpRequest();
    var requestURL = '/get/' + pizzaID;
    getRequest.open('GET', requestURL);

    getRequest.addEventListener('load', function (event) {
      if (event.target.status !== 200) {
        var responseBody = event.target.response;
        alert("Error accessing pizza prices " + responseBody);
      } else {
        return event.target.response;
      }
    })
}
