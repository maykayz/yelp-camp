

// This waits for the DOM to load correctly before changing elements
$(document).ready(function(){
    // All your normal JS code goes in here
    $(".rating").rating();
    Materialize.updateTextFields();
    $('.slider').slider();
    $('.materialboxed').materialbox();


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




 $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );

//modfel
$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    
    $("#landingBtn").click(function(){
        if(isLoggedIn()){
            $('.modal').modal('open');
        }
    });
  });






