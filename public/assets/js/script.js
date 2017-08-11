
$(document).ready(function() {
    Materialize.updateTextFields();
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


$.notify("Campground Added Successfully!", "success");











