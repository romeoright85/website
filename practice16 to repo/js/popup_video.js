/**
 * popup_video.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2015, Codrops
 * http://www.codrops.com
 */
;( function() {
	
	'use strict';

	var bodyEl = document.body,
		videoWrap = document.querySelector('.video-wrap'),
		videoEl = videoWrap.querySelector('video'),
		playCtrl = document.querySelector('.action--play'),
		closeCtrl = document.querySelector('.action--close');

	function init() {
		initEvents();
	}

	function initEvents() {
		playCtrl.addEventListener('click', play);
		closeCtrl.addEventListener('click', hide);
		videoEl.addEventListener('canplaythrough', allowPlay);
		videoEl.addEventListener('ended', hide);
	}

	function allowPlay() {
		classie.add(bodyEl, 'video-loaded');
	}

	function play() {
		videoEl.currentTime = 0;
		classie.remove(videoWrap, 'video-wrap--hide');
		classie.add(videoWrap, 'video-wrap--show');
		setTimeout(function() {videoEl.play();}, 1500);/*ms delay before video plays*/
		navbar.delay(500).fadeOut();/*hide nav bar*/
		document.body.style['overflow'] = 'hidden';/*hide scroll bar and prevent scrolling*/
	}

	function hide() {
		classie.remove(videoWrap, 'video-wrap--show');
		classie.add(videoWrap, 'video-wrap--hide');
		videoEl.pause();
		navbar.fadeIn();/*show nav bar*/
		document.body.style['overflow'] = 'scroll';/*show scroll bar and allow scrolling*/
	}

	init();

	
	
		
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


})();