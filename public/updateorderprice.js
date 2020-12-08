function updatePrice(){
    $.ajax({
        url: '/neworder/',
        type: 'PUT',
        data: $('#add-new-order').serialize(),
        success: function(result){
            window.location.replace("/");
        }
    })
};