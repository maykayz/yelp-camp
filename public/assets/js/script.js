

// This waits for the DOM to load correctly before changing elements
$(document).ready(function(){
    // All your normal JS code goes in here
    $(".rating").rating();
    Materialize.updateTextFields();
    $('.slider').slider();
    $('.materialboxed').materialbox();
    $(".button-collapse").sideNav();
  });

//$('#textarea1').val('New Text');
$('#textarea1').trigger('autoresize');
$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })
;
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

//setting image link for profile pic
//get avatar model
var images = $(".avatarModal").find($("img"));
images.each(function(){
    var self = $(this);
    self.on("click",function(){
        var link = self.attr("src");
        console.log(link);
        $("#registerPic").val(link);
        $('.modal').modal('close');
        var avatarchoose = $("#avatarChoose");
        var icon = avatarchoose.find("i");
        icon.remove();
        var currentimgs = avatarchoose.find($('img'));
        if(currentimgs.length > 0){
            currentimgs.each(function(){
                $(this).remove();
            });
           }
        var newImage= '<img class="ui medium circular image" src="'+link+'">';
            avatarchoose.append(newImage);
    } );
});
// get rows 

//get each button


// click button 

// if button 1 --> ../../public/images/1.png

//set value of form input image





