
/*
See this link for smooth scroll logic
https://www.youtube.com/watch?v=X43pKWTRO64&index=9&list=PLqGj3iMvMa4KQZUkRjfwMmTq_f1fbxerI
Also see: page_fade_inout.css for "fade in on load" effects
*/



/*GLOBAL VARIABLES*/

    var textToAnimate1 = saveAndDeleteText('introText_1');
    var textToAnimate2 = saveAndDeleteText('introText_2');
    var textToAnimate3 = saveAndDeleteText('introText_3');
    var body = $("body");
    var html_body = $('html, body');    
    var navbar = $(".navbar");
    var nav_list_item = $('.nav li');
    var nav_links = $('.nav li a');
    var education_side_page = $(".education .side-page");
    var education_side_page_img = $(".education .side-page .img"); 
    var education_side_page_caption_div = $(".education .side-page .cs-style-6-caption-div"); 
    var education_container = $(".education-container");
    var education_main = $(".education .main");
    var education_main_img = $(".education .main .img");
    var education_side_pages_slide = $(".education .side-pages-slide");
    var education_side_page_return = $(".education .side-page-return");
    var career_hidden_pages = $(".career .hidden-pages");
    var career_hidden_pages_open = $( ".career .hidden-pages-open" );
    var right_side_page = $(".career .hidden-pages .right_side_page");  
    var left_side_page = $(".career .hidden-pages .left_side_page");
    var career_hidden_pages_exit = $(".career .hidden-pages .exit");
    var career_hidden_pages_left_side_page = $("#career_left_side_page");
    var career_hidden_pages_right_side_page = $("#career_right_side_page");
    var signature_image ='<img class="signature-img" src="img/signature.png">';
    var signature_container = $(".signature-container");
    var svg_width_breakpt = 700; //in pixels, the window size breakpoint when to switch from svg to img for the signature based on eye balled size and empirical measurements of the svg and window size
    var signatureType = 'svg';//initialize to the svg type on page load
    var quoteClass = $('.quote_01');

    //these variables will get different values on window resize
    var quote_01_h1_scale_factor = 0;//the bigger the number, the less it transform translates (parallax/moves/slides down) (positional movement adjustment)
    var quote_01_lead_scale_factor = 0;//the bigger the number, the less it transform translates (parallax/moves/slides down) (positional movement adjustment)
    var fadeAndParallaxScroll_offsetValue = 0;//the bigger the more delay before the parallax takes effect (timing)
    var fadeAndParallaxScroll_opacityScale = 0;//used to differ the rate of opacity/fadeout the h1 vs lead elements in the quote_01 section. The smaller the number the closer the two face at the same time. So increase the number to increase the delay of fading (timing)
    var right_side_page_windowWidth = 0;//used for the callback in loadCareerPage() for use in rightSideTextFadeIn()
    var career_hidden_pages_exit = $(".career .hidden-pages .exit .fa-close")
    var career_hidden_pages_breakpt = 440;//media query breakpoint to change the size of the exit button for the career hidden right side page

$(function(){//start of encapsulation

          
    //disable scrolling initially
//TEMP REMOVE TO ALLOW FASTER DEBUGGING... put back later buy just commenting disableScroll();
 

    //save and then hide text and animate them back in (if javascript isn't     enabled it won't animate, but the text will still be there)

    
//--------------------------
//animate text
//--------------------------
    
    //function parameters
    var textAnimateDuration = 40;//how much time to wait between each letter
    var fadeSpeed = 1500;//how much time to fade each letter
    
    
    var pageFadeInDelay = 500;//how much time to delay to allow the page to Fade In
    var textDelay2 = 2000;//how much time to delay before displaying introText_2
    var textDelay3 = 4000;//how much time to delay before displaying introText_3
    var scrollDelay = textDelay3 + 500;//how much time to delay before enabling scrolling
    
    
    
    
    //Intro Text 1
    
    
    
    //Intro Text 2
    fadeInText('introText_1', textToAnimate1, textAnimateDuration, fadeSpeed);
 
    
    
    
    //Intro Text 2
    setTimeout(
        function(){
            fadeInText('introText_2', textToAnimate2, textAnimateDuration, fadeSpeed)                    
        }, textDelay2 + pageFadeInDelay
    );
    
    
    //Intro Text 3
    setTimeout(
        function(){
            fadeInText('introText_3', textToAnimate3, textAnimateDuration, fadeSpeed)                    
        }, textDelay3 + pageFadeInDelay
    );
    
    //Scroll Enable
    setTimeout(
        function(){
            //re-enable scrolling
            enableScroll();


        }, scrollDelay
    );    
            
    
    var windowWidth = $(window).width();
    careerHiddenPagesExit_MediaQuery(windowWidth);//sets the size of the exit button (using font awesome classes) depending on the screen width
    fadeAndParallaxScroll_MediaQuery(windowWidth);//get the scroll values for the parallax on initial load

    
//--------------------------    
//End of text animation
//--------------------------    
    
    
    
    //--------------------------
    //Smooth Scrolling
    //--------------------------

    
    //Add smooth scroll for the nav links
    smoothScroll(1000);//function in utils.js


    
    //--------------------------
    //Close Mobile Menu After Click
    //--------------------------

    //http://stackoverflow.com/questions/16680543/hide-twitter-bootstrap-nav-collapse-on-click
    
    $('.navbar-brand').on('click', function(){//handles the brand of the nav bar
        $('.navbar-toggle').click() //bootstrap 3.x by Richard
    });

    $('.nav a').on('click', function(){//handles the rest of the nav bar
        $('.navbar-toggle').click() //bootstrap 3.x by Richard
    });
    
    //--------------------------
    //Capture scroll events
    //--------------------------
    
    $(window).scroll(function(){


        //get the latest value of the scroll position each time the user scrolls
        var windowScroll = $(this).scrollTop();

                    
        
        
        
        //update the active class of the nav bar on scroll
        scrollUpdateActiveClass(windowScroll);

        
        fadeAndParallaxScroll(windowScroll, fadeAndParallaxScroll_offsetValue, fadeAndParallaxScroll_opacityScale, quote_01_h1_scale_factor, quote_01_lead_scale_factor);//the 550 is the offset to delay the effect based on scrolling



        //animate bar graph when the skills div is scrolled into view
        barGraphAnimation(windowScroll,'skills', 500, 'level', 'start');//the bigger the offset the sooner the animation occurs

        
        //Bring the credits section elements in or out of hiding when the adjacent section (contact_me) is scrolled past
        /*
            Note: This is a fix to prevent bleed through of the credits section onto ther fixed sections like quote04 since if you have multiple fixed sections, they will all show through.
            To fix this, you change the z-index to hide the irrelevant ones at the moment, and then bring it back into view when the section is in view
        */
        loadCreditsWhenContactMeSectionInView(windowScroll, 'contact_me', 600, 'credits');//the bigger the offset the sooner the animation occurs
        

        //Load SVG or Image when the div is scrolled to the right element
        initialSignatureLoad(windowScroll, 'credits', 600);//the bigger the offset the sooner the animation occurs

        //fadeIn about me section
        fadeInSection(windowScroll, 'about_me', 500, 'fadeInContainer', 500);
        
        //fadeIn my ambitions section
        fadeInSection(windowScroll, 'ambitions', 500, 'fadeInContainer', 500);   
        
        
                
        //flip in x the element(s) in the quote_02 section
        flipInXSection(windowScroll, 'quote_02', 500, 'animated');
        
        
        
        //smack in the element(s) in the education section
        smackSection(windowScroll, 'education', 500, 'smackIn');

        //swoosh in the element(s) in the career section
        swooshSection(windowScroll, 'career', 500, 'swooshIn');
        
        
        //fade in down element(s) in the passions section
        fadeInDownSection(windowScroll, 'passions', 500, 'animated');
        
        
        
        //flip in x the element(s) in the quote_03 section
        flipInXSection(windowScroll, 'quote_03', 500, 'animated');
        
        
        
        //flip in x the element(s) in the quote_04 section
        flipInXSection(windowScroll, 'quote_04', 500, 'animated');
        
        
        
        
    });//end of window scroll events
    
    
    //--------------------------
    //Capture window resize events
    //--------------------------
    
    
    $(window).resize(function(){
    
        
        var windowWidth = $(window).width();
        
        
        //signature selection
        signatureRefreshOnResize(windowWidth);
        
        
        
        //start of media query adjustments to the javascript algorithms
        resizedSoExitCareerHiddenPages(body, navbar, career_hidden_pages, left_side_page, right_side_page,career_hidden_pages_exit);
        
        
        careerHiddenPagesExit_MediaQuery(windowWidth);
                
        fadeAndParallaxScroll_MediaQuery(windowWidth);
        
        
        //end of media query adjustments to the javascript algorithms
        
        
    
        
    });//end of window resize events
    

    
//--------------------------
//slide education side page
//--------------------------
    
    $(education_side_pages_slide).click(function(e) {
        var element_id = this.id;
        preventDefault(e);
        slideInEducationPage();
    });
    
//--------------------------
//end of slide education side page
//--------------------------    
    
        
//--------------------------
//exit button for slide education side page
//--------------------------
    
    
    $(education_side_page_return).click(function(e) {
        preventDefault(e);
        slideOutEducationPage();        
    });


//--------------------------
//end of exit button for slide education side page
//--------------------------    
    
//--------------------------
//open career hidden pages
//--------------------------
    
    
    $(career_hidden_pages_open).click(function(e) {
        var element_id = this.id;
        preventDefault(e);
               
        var windowWidth = $(window).width();
        loadCareerPage(element_id, windowWidth);
        openCareerHiddenPages(body, navbar, career_hidden_pages, left_side_page,right_side_page,career_hidden_pages_exit, windowWidth);

    });


//--------------------------
//end of open career hidden pages
//--------------------------    
    
    
    
//--------------------------
//exit button for career hidden pages
//--------------------------
    
    
    $(career_hidden_pages_exit).click(function(e) {
        preventDefault(e);
        exitCareerHiddenPages(body, navbar, career_hidden_pages, left_side_page, right_side_page,career_hidden_pages_exit);
        
    });


//--------------------------
//end of exit button for career hidden pages
//--------------------------    
    
    
    
    
    
    
    
    
    
});//end of encapsulation



// Check if it's time to start the fadeIn of the element(s) in that section
function fadeInSection(windowScroll, container_class, offset, element_class, fadeInDuration)
{
    
    /*
    notes:
        -make sure to set the CSS to opacity: 0 for the element(s) of that section, initially, for this function to fade that element in
        -pay attention to specificity
        use fadeTo and not FadeIn when changing opacity
    */

    if(scrolledToSection(windowScroll, container_class, offset))
    {//if the browser has scrolled to the desired section, fade in the element(s) that have the class passed by the variable element_class
        $('.' + container_class + ' .' + element_class).fadeTo(fadeInDuration, 1);
    }

}


// Check if it's time to start the smack of the element(s) in this section
function smackSection(windowScroll, container_class, offset, element_class)
{
        

    if(scrolledToSection(windowScroll, container_class, offset))
    {//if the browser has scrolled to the desired section, smack the element(s) that have the class passed by the variable element_class
        
        /*
        notes:
        -make sure to include the css file in your html
        -make sure to rename any classes in the bouncejs css file if it conficts with names you are already calling out
        -make sure to tag the element you want to animate with the corresponding class name (passed by element_class)
        -make sure to set the initial state of that element in css

        */
        $('.' + container_class + ' .' + element_class).addClass('smack-animation-target');
        
    }

}

// Check if it's time to start the swoosh of the element(s) in this section
function swooshSection(windowScroll, container_class, offset, element_class)
{
        

    if(scrolledToSection(windowScroll, container_class, offset))
    {//if the browser has scrolled to the desired section, swoosh the element(s) that have the class passed by the variable element_class
        
        /*
        notes:
        -make sure to include the css file in your html
        -make sure to rename any classes in the bouncejs css file if it conficts with names you are already calling out
        -make sure to tag the element you want to animate with the corresponding class name (passed by element_class)
        -make sure to set the initial state of that element in css

        */
        $('.' + container_class + ' .' + element_class).addClass('swoosh-animation-target');
    }

}





// Check if it's time to start the fade in down of the element(s) in this section
function fadeInDownSection(windowScroll, container_class, offset, element_class)
{
        

    if(scrolledToSection(windowScroll, container_class, offset))
    {//if the browser has scrolled to the desired section, fade in down the element(s) that have the class passed by the variable element_class
        
        /*
        notes:
        -for animate.css make sure to add the class "animated" as well as your desired animation class. You can add animated ahead of time if you like. Or you can use it as the tagging element (element_class).
        -make sure to include the css file in your html
        -make sure to rename any classes in the animate css file if it conficts with names you are already calling out
        -make sure to tag the element you want to animate with the corresponding class name (passed by element_class)
        -make sure to set the initial state of that element in css

        */
        $('.' + container_class + ' .' + element_class).addClass('fadeInDown');     
        
    }
}


// Check if it's time to start the flip in x the element(s) in this section
function flipInXSection(windowScroll, container_class, offset, element_class)
{
        

    if(scrolledToSection(windowScroll, container_class, offset))
    {//if the browser has scrolled to the desired section, flip in x the element(s) that have the class passed by the variable element_class
        
        /*
        notes:
        -for animate.css make sure to add the class "animated" as well as your desired animation class. You can add animated ahead of time if you like. Or you can use it as the tagging element (element_class).
        -make sure to include the css file in your html
        -make sure to rename any classes in the animate css file if it conficts with names you are already calling out
        -make sure to tag the element you want to animate with the corresponding class name (passed by element_class)
        -make sure to set the initial state of that element in css

        */
        $('.' + container_class + ' .' + element_class).addClass('fadeInDown');     
        
    }
}











// Check if it's time to start the animation for the bar graphs.
function barGraphAnimation(windowScroll, container_class, offset, element_class,classToAdd) {
    
    
    if( scrolledToSection( windowScroll, container_class, offset) )
    {//see how far the element is from the top of the dom
        var each_element = $( '.' + container_class + ' .' + element_class );
        each_element.each(function(){
            each_element.addClass(classToAdd);
        })
    }    
}


function openCareerHiddenPages(body, navbar,career_hidden_pages,left_side_page,right_side_page,career_hidden_pages_exit, windowWidth)
{

    
    //also see loadCareerPage() which gets called before this function
    
    //hide the main page and show the hidden pages
    body.css({
        "overflow": "hidden",
    });  
    navbar.stop().fadeOut();
    career_hidden_pages.stop().show();
        
    setTimeout(function(){
        career_hidden_pages_exit.stop().fadeIn(500);
        left_side_page.stop().fadeIn(1000);
        }, 1000
    );
  
    
    
    
    //media query, screen size dependent effect
    if(windowWidth > 992) {
        // the width of browser is more then 992px
        //right_side_page.stop().show().animate({left: '50%'},1000);
        
        
        //reset the CSS() just in case the window was resized), before starting the new effect
        right_side_page.css({
        "left": "100%",
        });  
        right_side_page.stop().show().animate({left: '50%'},1000);
    } else {
        // the width of browser is less then 992px
        //reset the CSS() just in case the window was resized), before starting the new effect
        right_side_page.css({
        "left": "0%",
        });  
        
        right_side_page.stop().show();        
        //DEBUG, work on me
        //right_side_page.stop().show().animate({left: '100%'},1000);        
        //this kinda works until you resize it back out, then it breaks
    }

    
    
}

function exitCareerHiddenPages(body, navbar,career_hidden_pages,left_side_page,right_side_page,career_hidden_pages_exit)
{

    //show the main page and hide the hidden pages
    /*NOTE: Currently if you resize the window after the scroll position is captured, it won't return where you left off. This will be hard to do. So maybe in the future it can detect window resize and just return it to the top of the career page using
    
    var new_position = $('#career').offset();
    window.scrollTo(new_position.left, new_position.top);
    */
    
    body.css({
        "overflow": "scroll",
    });  
    
    
    
              
    setTimeout(function(){
        career_hidden_pages.stop().hide();    
        navbar.stop().fadeIn();
        }, 500
    );  
    
    
    var windowWidth = $(window).width();
    //media query, screen size dependent effect
    if(windowWidth > 992) {
        right_side_page.stop().animate({left: '100%'},500);
        career_hidden_pages_exit.stop().fadeOut(250);
        left_side_page.stop().fadeOut(500);
        

        
    } else {
        // the width of browser is less then 992px
        right_side_page.stop().fadeOut();
        career_hidden_pages_exit.stop().fadeOut(250);
        left_side_page.stop().fadeOut(500);
    }
    
    
};



function resizedSoExitCareerHiddenPages(body, navbar,career_hidden_pages,left_side_page,right_side_page,career_hidden_pages_exit)
{

    
    body.css({
        "overflow": "scroll",
    });  
    
    
              

    career_hidden_pages.stop().fadeOut();
    navbar.stop().fadeIn();
    right_side_page.stop().fadeOut();
    career_hidden_pages_exit.stop().fadeOut();
    left_side_page.stop().fadeOut();
        

    
    
};





















function loadCareerPage(element_id, windowWidth)
{
        
    
//Note: When I tried to pass a parameter to the callback function for the load, it seemed to pass the value okay, but the animation didn't work. Only when I used a global variable (right_side_page_windowWidth), did it work.
  right_side_page_windowWidth = windowWidth;//set the global variable

  switch(element_id)
  {
      case "career-jpl":
          career_hidden_pages_right_side_page.load( "html/career/career_jpl.html", rightSideTextFadeIn);//url path with respect to the index.html's DOM
          career_hidden_pages_left_side_page.css("background-image","url(img/career/career_jpl.png)")//url path with respect to the index.html's DOM
          break;
      case "career-hs":
          career_hidden_pages_right_side_page.load( "html/career/career_hs.html",rightSideTextFadeIn);//url path with respect to the index.html's DOM
          career_hidden_pages_left_side_page.css("background-image","url(img/career/career_hs.png)")//url path with respect to the index.html's DOM
          break;          
      case "career-ngc":
          career_hidden_pages_right_side_page.load( "html/career/career_ngc.html",rightSideTextFadeIn);//url path with respect to the index.html's DOM
          career_hidden_pages_left_side_page.css("background-image","url(img/career/career_ngc.png)")//url path with respect to the index.html's DOM
          break;     
      default:
          career_hidden_pages_right_side_page.load( "html/career/blank.html",rightSideTextFadeIn );
          career_hidden_pages_left_side_page.css("background-image","url(http://placehold.it/500x500)")//url path with respect to the index.html's DOM
          break;
  }


    
};




function rightSideTextFadeIn(windowWidth){
    var right_side_page_p = $(".career .hidden-pages .right_side_page p");//not sure why global declaration of is didn't work. had to declare locally here to get the fadeIn to work
    
    var right_side_page_hr = $(".career .hidden-pages .right_side_page hr");//not sure why global declaration of is didn't work. had to declare locally here to get the fadeIn to work
    
    if(right_side_page_windowWidth > 992)
    {
        right_side_page_p.stop().delay(1000).fadeIn(2000);
        right_side_page_hr.stop().delay(1000).fadeIn(2000);
    }
    else
    {
        right_side_page_p.stop().delay(500).fadeIn(1000);
        right_side_page_hr.stop().delay(1000).fadeIn(1000);
    }
    
    
    
}

function slideInEducationPage()
{
 
    
    $(education_main).stop().hide();
    $(education_main_img).stop().css("opacity","0");
    $(education_container).stop().animate({left: '0%'},250);
    $(education_side_page).show();    
    $(education_side_page_img).animate({opacity: '1'},1500);    
    $(education_side_page_caption_div).delay(500).animate({opacity: '1'},1000);    
    $(html_body).stop().animate({
                scrollTop: $("#education").offset().top
            }, 0);//align the top of the section to the window
    
    
};

function slideOutEducationPage()
{

    
     $(education_side_page).stop().hide();
     $(education_side_page_img).stop().css("opacity","0");
     $(education_side_page_caption_div).stop().css("opacity","0");
     $(education_container).stop().animate({left: '-100%'},250);
     $(education_main).show();
     $(education_main_img).animate({opacity: '1'},1500);
     $(html_body).stop().animate({
                scrollTop: $("#education").offset().top
            }, 0);//align the top of the section to the window
        
};



function initialSignatureLoad(windowScroll, container_class, offset)
{
 
    //Detect Scroll to the credits section
    
    if( scrolledToSection( windowScroll, container_class, offset) )
    {//see how far the element is from the top of the dom
        
        if(!signature_container.hasClass("signature-loaded") )//only load the signature if it does not already exist. Use "signature-loaded" class on the div with the "signature-container" class as a flag to indicate if it already exists (else will reload it on window resize in another functions)
        {
            signatureSelection();
        }
        
    }
    
    
}


function loadCreditsWhenContactMeSectionInView(windowScroll, container_class, offset, target_class)
{
 
    //Detect Scroll to the credits section
    
    
    //The container_class is the section before (detecting when user has scrolled to the bottom of that class) (i.e. .contact_me)
    //The target class is the section of interest and gets the z-index change (i.e. .credits)
    
    if( scrolledToSection( windowScroll, container_class, offset) )
    {//see how far the element is from the top of the dom
        //$(target_class).addClass('z_index_show');
        $( '.' + target_class).css("z-index", "-3");
        //console.log(windowScroll);//debug
        
    }
    else{
        $( '.' + target_class).css("z-index", "-4");
    }
        
}




function signatureRefreshOnResize(windowWidth){//overloaded style function

            
        
        if ( windowWidth > svg_width_breakpt && signatureType != 'svg'){
            //if the window has resized and can accomodate svg and it wasn't aready the svg type, run the signature selection
            signatureSelection('svg', windowWidth );//load the svg
            signatureType = 'svg';//set the type to svg
        }
        else if( windowWidth <= svg_width_breakpt && signatureType != 'img')
        {
            //if the window has resized and can accomodate svg and it wasn't aready the svg type, run the signature selection
            signatureSelection('img', windowWidth);
            signatureType = 'img';//set the type to img
        }
        else{
            //do nothing since the correct once has already loaded
        }
        
}




function signatureSelection(type, windowWidth){//overloaded style function
    //Reset the flag class of signature-loaded
    
    
    if(signature_container.hasClass("signature-loaded"))
    {
    signature_container.removeClass("signature-loaded");
    }    
    //Reset the section by emptying the signature-container of any elements
    signature_container.empty();
    //Then Detect Window Size
    //If window is big enough to load the SVG signature animation
    
    
    
    if(typeof type == "undefined")//check to see if a type was not passed to the function
    {
        if( $(window).width() > svg_width_breakpt )//since no type was passed, you have to query for the window width yourself here
        {
            //Load/reload the SVG signature animation
            signature_container.load( "html/credits/svg_signature.html");
        }
        else
        //Else if the window is too small for the SVG signature animation
        {
            //Load the scalable signature image    
            signature_container.append(signature_image);
            $(".signature-container .signature-img").hide();
            $(".signature-container .signature-img").fadeIn(1000);
        }
        signature_container.addClass("signature-loaded");//flag that the signature has beed added already
    }
    //check for types from if a type was passed to the function
    else if( type == 'svg' )
    {
        //Load/reload the SVG signature animation
        signature_container.load( "html/credits/svg_signature.html");
    }
    else if( type == 'img' )
    //Else if the window is too small for the SVG signature animation
    {
        //Load the scalable signature image    
        signature_container.append(signature_image);
        $(".signature-container .signature-img").hide();
        $(".signature-container .signature-img").fadeIn(1000);
    }
    else//default
    {
        //Load the scalable signature image    
        signature_container.append(signature_image);
        $(".signature-container .signature-img").hide();
        $(".signature-container .signature-img").fadeIn(1000);
    }
    signature_container.addClass("signature-loaded");//flag that the signature has beed added already
}


function scrolledToSection(windowScroll, container_class, offset) {
    //used as an utils function to detect if the browser has scrolled to the desired section
    
    //Note: Since this function is called by another function (nested), you have to define it in this same javascript file and can't do it externally
    
    //the bigger the offset the sooner the animation occurs
    
    
    if( windowScroll > $( '.' + container_class ).offset().top - offset )
    {
        return true;
    }
    else{
        return false;
    }
}

function careerHiddenPagesExit_MediaQuery(windowWidth){
    

        //sets the size of the exit button (using font awesome classes) depending on the screen width
            
        
        if ( windowWidth < career_hidden_pages_breakpt){
            //if the window size is less than the career_hidden_pages_breakpt
            
            if(career_hidden_pages_exit.hasClass("fa-3x"))
            {
                career_hidden_pages_exit.removeClass("fa-3x");
            }            
            career_hidden_pages_exit.addClass("fa-2x");
        }
        else
        {
                        
            if(career_hidden_pages_exit.hasClass("fa-2x"))
            {
                career_hidden_pages_exit.removeClass("fa-2x");
            }            
            career_hidden_pages_exit.addClass("fa-3x");
        }
        
}


function fadeAndParallaxScroll_MediaQuery(windowWidth) {
    
    
    
/*
    Notes on Adjustments of values
    quote_01_h1_scale_factor: the bigger the number, the less it transform translates (parallax/moves/slides down) (positional movement adjustment)
    quote_01_lead_scale_factor: the bigger the number, the less it transform translates (parallax/moves/slides down) (positional movement adjustment)
    fadeAndParallaxScroll_offsetValue: the bigger the more delay before the parallax takes effect (timing)
    fadeAndParallaxScroll_opacityScale: used to differ the rate of opacity/fadeout the h1 vs lead elements in the quote_01 section. The smaller the number the closer the two face at the same time. So increase the number to increase the delay of fading (timing)
    
    you also need to adjust the css media queries such as height for .quote_01 .container-fluid and margin-top for .quote_01 h1 and .quote_01 p.lead
*/
    
    
        //media queries
        if(windowWidth <= 330)
        {
            quote_01_h1_scale_factor = 1.1;//trial and error scale factors
            quote_01_lead_scale_factor = 0.8;//trial and error scale factors
            fadeAndParallaxScroll_offsetValue = 1000;//trial and error offset value   
            fadeAndParallaxScroll_opacityScale = 0.7;//trial and error offset value   
            //yellow background when css debug is on
        }
        else if(windowWidth <= 410)
        {
            quote_01_h1_scale_factor = 1.1;//trial and error scale factors
            quote_01_lead_scale_factor = 0.5//trial and error scale factors
            fadeAndParallaxScroll_offsetValue = 700;//trial and error offset value   
            fadeAndParallaxScroll_opacityScale = 0.7;//trial and error offset value   
            //purple background when css debug is on
        }    
        else if(windowWidth <= 440)
        {
            quote_01_h1_scale_factor = 1;//trial and error scale factors
            quote_01_lead_scale_factor = 0.9;//trial and error scale factors
            fadeAndParallaxScroll_offsetValue = 850;//trial and error offset value   
            fadeAndParallaxScroll_opacityScale = 0.9;//trial and error offset value   
            //purple background when css debug is on
        }
        else if(windowWidth <= 780)
        {
            quote_01_h1_scale_factor = 1.1;//trial and error scale factors
            quote_01_lead_scale_factor = 0.9;//trial and error scale factors
            fadeAndParallaxScroll_offsetValue = 850;//trial and error offset value   
            fadeAndParallaxScroll_opacityScale = 1.5;//trial and error offset value    
            //skyblue background when css debug is on
        }    
        else if(windowWidth <= 990)
        {
            quote_01_h1_scale_factor = 1.1;//trial and error scale factors
            quote_01_lead_scale_factor = 1.8;//trial and error scale factors
            fadeAndParallaxScroll_offsetValue = 550;//trial and error offset value       
            fadeAndParallaxScroll_opacityScale = 2;//trial and error offset value    
            //green background when css debug is on
        }    
        else if(windowWidth <= 1130)
        {
            quote_01_h1_scale_factor = 1.1;//trial and error scale factors
            quote_01_lead_scale_factor = 1.8;//trial and error scale factors
            fadeAndParallaxScroll_offsetValue = 350;//trial and error offset value   
            fadeAndParallaxScroll_opacityScale = 2;//trial and error offset value    
            //blue background when css debug is on
        }        
        else if(windowWidth <= 1290)
        {
            quote_01_h1_scale_factor = 1.1;//trial and error scale factors
            quote_01_lead_scale_factor = 1.8;//trial and error scale factors
            fadeAndParallaxScroll_offsetValue = 480;//trial and error offset value                                
            fadeAndParallaxScroll_opacityScale = 3;//trial and error offset value    
            //red background when css debug is on
        }            
        else
        {
            quote_01_h1_scale_factor = 1.1;//trial and error scale factors
            quote_01_lead_scale_factor = 1.8;//trial and error scale factors
            fadeAndParallaxScroll_offsetValue = 550;//trial and error offset value        
            fadeAndParallaxScroll_opacityScale = 4;//trial and error offset value    
        }
        
}



function fadeAndParallaxScroll(windowScroll, fadeAndParallaxScroll_offsetValue, fadeAndParallaxScroll_opacityScale, quote_01_h1_scale_factor, quote_01_lead_scale_factor) {
    
    
    
        var opacity = (quoteClass.offset().top - windowScroll + fadeAndParallaxScroll_offsetValue)/windowScroll;
        
    
    
        
        //references:
            //https://www.youtube.com/watch?v=zEXubVd_y_M&index=6&list=PLqGj3iMvMa4IyCbhul-PdeiDqmh4ooJzk
            //https://www.youtube.com/watch?v=WTZpNAbz3jg

        
        $('.quote_01 h1').css({
            'opacity': opacity,
            'transform': 'translate(0px, ' + windowScroll/quote_01_h1_scale_factor + '%)'//the scaling factors were eyeballed
        })
        $('.quote_01 .lead').css({
            'opacity': opacity*fadeAndParallaxScroll_opacityScale,
            'transform': 'translate(0px, ' + windowScroll/quote_01_lead_scale_factor + '%)'//the scaling factors were eyeballed
        })
            
    
}





