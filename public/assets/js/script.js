var moment  = require('moment');



$(document).ready(function() {
    Materialize.updateTextFields();
    
//    
//    $('.commentarea').keydown(function(event) {
//        if (event.keyCode == 13) {
//            this.form.submit();
//            return false;
//         }
//    });

  });

//$('#textarea1').val('New Text');
$('#textarea1').trigger('autoresize');

function deleteAlert(){
    window.location.hash = "";
    document.querySelector("#deleteMessage").classList.remove("hidden");
    window.location.hash="#deleteMessage";
}
function cancelAlert(){
    document.querySelector("#deleteMessage").classList.add("hidden");
}

//function formatDate(date){
//    var now     = moment(date).format('MMMM Do YYYY, h:mm:ss a');
//    return now;
//}
    












