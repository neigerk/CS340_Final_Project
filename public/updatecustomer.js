function updateCustomer(id){
    $.ajax({
        url: '/browsecustomerorder/' + id,
        type: 'PUT',
        data: $('#update-customer').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
