function filterOrdersByDate() {
    //get the id of the selected homeworld from the filter dropdown
    var start_date = document.getElementById('start_date').value
    var end_date = document.getElementById('end_date').value
    //construct the URL and redirect to it
    console.log("Attempting to filter");
    window.location = '/browsecustomerorder/filter/' + start_date + '/' + end_date
}
