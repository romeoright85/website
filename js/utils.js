

function smoothScroll(duration){
    $('a[href^="#"]').on('click', function(event){
            
        var $this = $(this);
        //animate the auto scroll on nav link click
        var target = $( $this.attr('href') );
        if(target.length){
            event.preventDefault();
            $(html_body).animate({
                scrollTop: target.offset().top
            }, duration);
        }
    });
}


function scrollUpdateActiveClass(windowScroll){
    
    
    $(nav_links).each(function () {
        var currLink = $(this);
        
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top -150 <= windowScroll && refElement.position().top + refElement.height() > windowScroll ) {//-150 to accomodate for the pseudo class anchor-offset used for the nav bar height compensation   
            $(nav_list_item).removeClass("active");
            currLink.parent().addClass("active");
            currLink.focus();
        }
        else{
            currLink.parent().removeClass("active");
            currLink.blur();
        }
    });
        
}





function fadeInText(idTag, textToAnimate, textAnimateDuration, fadeSpeed){
//based on http://jsfiddle.net/bGsa3/159/
//function parameters
//var textAnimateDuration = how much time the text will animate for
//var fadeSpeed = how much time to fade each letter
    

        var arrayOfLetterSpans = jQuery.map(
            textToAnimate.split(''),//debugtextToAnimate.split(''),//debug
            function (letter) {
                return $('<span>' + letter + '</span>');
            }
        );

        var destination = $( '#' + idTag);
        

        var counter = 0;
    
        var i = setInterval(
                    function () {
                        arrayOfLetterSpans[counter].appendTo(destination).hide().fadeIn(fadeSpeed);
                        counter += 1;
                        if (counter >= arrayOfLetterSpans.length)
                        {
                            clearInterval(i);    
                        }
                            
                    }, textAnimateDuration
                );

}//end of fadeInText function





function saveAndDeleteText( idTag ){
    var object = $( '#' + idTag );
    var string = object.html();
    object.empty();
    return string;
}//end of fadeInText function



//--------------------------    
//disable/enable scrolling
//--------------------------    
//http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}



