(function($){

    "use strict";

    /* ---------------------------------------------------------------------------
	 * Global vars
	 * --------------------------------------------------------------------------- */

    var scrollticker;	// Scroll Timer | don't need to set this in every scroll

    var top_bar_top 	= '61px';
    var header_H 		= 0;
    var mobile_init_W 	= ( window.mfn.mobile_init ) ? window.mfn.mobile_init : 1240;

    /* ---------------------------------------------------------------------------
	 * Header | Sticky
	 * --------------------------------------------------------------------------- */

	function mfn_sticky(){
		if( $( 'body' ).hasClass( 'sticky-header' ) ){
			if( ! ( $( 'body' ).hasClass( 'header-creative' ) && $(window).width() >= 768 ) ){

				var start_y = header_H;
				var window_y = $(window).scrollTop();

				if( window_y > start_y ){

					if( ! ( $( '#Top_bar' ).hasClass( 'is-sticky' ) ) ){

						$( '.header_placeholder' ).css( 'height', $( '#Top_bar' ).height() );

						$( '#Top_bar' )
							.addClass( 'is-sticky' )
							.css( 'top', -60 )
							.animate({
								'top': '0px'
							}, 300 );

						// Header width
						mfn_header();
					}

				} else {

					if( $( '#Top_bar' ).hasClass( 'is-sticky' ) ){

						$( '.header_placeholder' ).css( 'height', 0 );
						$( '#Top_bar' )
							.removeClass( 'is-sticky' )
							.css( 'top', top_bar_top );

						// Header width
						mfn_header();

					}

				}

				mfn_mobile_sticky();

			}
		}
	}


	/* ---------------------------------------------------------------------------
	 * Header | Sticky | Height
	 * --------------------------------------------------------------------------- */

	function mfn_stickyH(){

    	if( $('body').hasClass( 'header-below' ) ){

	    	// header below slider
	    	header_H = $( '.mfn-main-slider' ).innerHeight() + $( '#Top_bar' ).innerHeight();

	    } else {

	    	// default
	    	header_H = $( '#Top_bar' ).innerHeight() + $( '#Action_bar' ).innerHeight();

	    }

    }


    /* ---------------------------------------------------------------------------
	 * Header | Sticky | Mobile
	 * --------------------------------------------------------------------------- */

	function mfn_mobile_sticky(){
		if( $( 'body' ).hasClass( 'mobile-sticky' ) && ( $( window ).width() < 768 ) ){

			var windowH = $(window).height();
			var offset = 0 + $( '#Top_bar .logo' ).height();

			if( ( ! $( '#Top_bar' ).hasClass( 'is-sticky' ) ) && $( '#Action_bar' ).is( ':visible' ) ){
				offset += $( '#Action_bar' ).height();
			}

			var menuH = windowH - offset;
			if( menuH < 176 ){
				menuH = 176;
			}

			$( '#Top_bar #menu' ).css( 'max-height', menuH + 'px' );

		}
	}


	/* ---------------------------------------------------------------------------
	 * Header | Top bar left | Width
	 * --------------------------------------------------------------------------- */

	function mfn_header(){
		var rightW = $('.top_bar_right').innerWidth();
		if( rightW && ! $('body').hasClass('header-plain') ){
			rightW += 10;
		}
		var parentW = $('#Top_bar .one').innerWidth();
		var leftW = parentW - rightW;
		$('.top_bar_left, .menu > li > ul.mfn-megamenu').css( 'width', leftW );
	}


	/* ---------------------------------------------------------------------------
	 * FIX | Header | Sticky | Height
	 * --------------------------------------------------------------------------- */

	function fixStickyHeaderH(){
		var stickyH = 0;

		// FIX | sticky top bar height

		var topBar = $( '.sticky-header #Top_bar' );

		if( topBar.hasClass( 'is-sticky' ) ){
			stickyH = $( '.sticky-header #Top_bar' ).innerHeight();
		} else {
			topBar.addClass( 'is-sticky' );
			stickyH = $( '.sticky-header #Top_bar' ).innerHeight();
			topBar.removeClass( 'is-sticky' );
		}

		// FIX | responsive
		if( $( window ).width() < mobile_init_W  ){

			if( $(window).width() < 768 ){

				// mobile
				if( ! $( 'body' ).hasClass( 'mobile-sticky' ) ){
					stickyH = 0;
				}

			} else {

				// tablet
				if( ! $( 'body' ).hasClass( 'tablet-sticky' ) ){
					stickyH = 0;
				}

			}

		}

		return stickyH;
	}

	/* ---------------------------------------------------------------------------
	 * Back To Top | Sticky / Show on scroll
	 * --------------------------------------------------------------------------- */

	function backToTopSticky(){

		if( $('#back_to_top.sticky.scroll').length ){
			var el = $('#back_to_top.sticky.scroll');

			// Clear Timeout if one is pending
			if( scrollticker ){
				window.clearTimeout(scrollticker);
				scrollticker = null;
			}

			el.addClass('focus');

			// Set Timeout
			scrollticker = window.setTimeout(function(){
				el.removeClass('focus');
			}, 1500); // Timeout in msec

		}

	}


	/* ---------------------------------------------------------------------------
	 * # Hash smooth navigation
	 * --------------------------------------------------------------------------- */

	function hashNav(){

		// # window.location.hash
		var hash = window.location.hash;

		if( hash ){

			// FIX | Master Slider
			if( hash.indexOf( "&" ) > -1 || hash.indexOf( "/" ) > -1 ){
				return false;
			}

			if( $( hash ).length ){

				var tabsHeaderH = $( hash ).siblings( '.ui-tabs-nav' ).innerHeight();

				$( 'html, body' ).animate({
					scrollTop: $( hash ).offset().top - fixStickyHeaderH() - tabsHeaderH - 0
				}, 500 );
			}

		}

	}


	/* ---------------------------------------------------------------------------
	 * One Page | Scroll Active
	 * --------------------------------------------------------------------------- */

	function onePageActive(){
		if( $('body').hasClass('one-page') ){

			var stickyH	= $('.sticky-header #Top_bar').innerHeight();
			var windowT = $(window).scrollTop();
			var start	= windowT + stickyH + 0 + 1;
			var first 	= false;

			$('div[data-id]').each(function(){

				if( $(this).visible( true ) ){
					if( !first ){
						first = $(this);
					} else if( ( $(this).offset().top < start ) && ( $(this).offset().top > first.offset().top ) ) {
						first = $(this);
					}
				}

				if( first ){
					var newActive = first.attr('data-id');
			        var active = '[data-hash="'+ newActive +'"]';

			        if( newActive ){
				        var menu = $('#menu');
				        menu.find('li').removeClass('current-menu-item current-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');
				        $( active, menu )
				        	.closest('li').addClass('current-menu-item')
				        	.closest('.menu > li').addClass('current-menu-item');
			        }
				}

			});

		}
	}


	/* --------------------------------------------------------------------------------------------------------------------------
	 *
	 * $(document).ready
	 *
	 * ----------------------------------------------------------------------------------------------------------------------- */


	$(document).ready(function(){


		/* ---------------------------------------------------------------------------
		 * Top Bar
		 * --------------------------------------------------------------------------- */

		$( '#Top_bar' ).removeClass( 'loading' );

		top_bar_top = parseInt( $('#Top_bar').css('top'), 10 );
		if( top_bar_top < 0 ) top_bar_top = 61;
		top_bar_top = top_bar_top + 'px';


		/* ---------------------------------------------------------------------------
		 * Menu | Overlay
		 * --------------------------------------------------------------------------- */

		$( '.overlay-menu-toggle' ).click( function(e){
			e.preventDefault();

			$(this).toggleClass('focus');
			$( '#Overlay' ).stop(true,true).fadeToggle(500);

			var menuH = $('#Overlay nav').height() / 2;
			$( '#Overlay nav' ).css( 'margin-top', '-' + menuH + 'px' );
		});


		/* ---------------------------------------------------------------------------
		 * Menu | Responsive | button
		 * --------------------------------------------------------------------------- */

		$( '.responsive-menu-toggle' ).on( 'click', function(e){
			e.preventDefault();

			var el = $(this);
			var menu = $('#Top_bar #menu');
			var menuWrap = menu.closest('.top_bar_left');

			el.toggleClass('active');

			// sticky menu button
			if( el.hasClass('is-sticky') && el.hasClass('active') && ( $(window).width() < 768 ) ){

				var top = 0;
				if( menuWrap.length ){
					top = menuWrap.offset().top - 0;
				}
				$('body,html').animate({
					scrollTop: top
				}, 200);

			}

			menu.stop(true,true).slideToggle(200);
		});


		/* ---------------------------------------------------------------------------
		 * Menu | mfnMenu
		 * --------------------------------------------------------------------------- */

		function mainMenu(){

			var mm_mobile_init_W = mobile_init_W;

			if( $( 'body' ).hasClass( 'header-simple' ) || $( '#Header_creative.dropdown' ).length ){
				mm_mobile_init_W = 9999;
			}

			$( '#menu > ul.menu' ).mfnMenu({
				addLast		: true,
				arrows		: true,
				mobileInit	: mm_mobile_init_W,
				responsive	: window.mfn.responsive
			});

			$( '#secondary-menu > ul.secondary-menu' ).mfnMenu({
				mobileInit	: mm_mobile_init_W,
				responsive	: window.mfn.responsive
			});

		}

		mainMenu();

		mfn_stickyH();
		mfn_sticky();
		mfn_mobile_sticky();


		/* ---------------------------------------------------------------------------
		 * Menu | One Page | Active on Scroll & Click
		 * --------------------------------------------------------------------------- */

		function onePageMenu(){
			if( $('body').hasClass('one-page') ){

				var menu = $('#menu');


				// add attr [data-hash] & [data-id] ----------

				$('a[href]', menu).each(function(){

					var url = $(this).attr( 'href' );
					if( url && url.split('#')[1] ){

						// data-hash
						var hash = '#' + url.split('#')[1];
						if( hash && $(hash).length ){				// check if element with specified ID exists
							$(this).attr( 'data-hash', hash );
							$(hash).attr( 'data-id', hash );
						}

						// Visual Composer
						var vcHash = '#' + url.split('#')[1];
						var vcClass = '.vc_row.' + url.split('#')[1];
						if( vcClass && $(vcClass).length ){			// check if element with specified Class exists
							$(this).attr( 'data-hash', vcHash );
							$(vcClass).attr( 'data-id', vcHash );
						}

					}

				});


				// active ----------

				var hash;
				var activeSelector = '.menu > li.current-menu-item, .menu > li.current-menu-parent, .menu > li.current-menu-ancestor, .menu > li.current-page-ancestor, .menu > li.current_page_item, .menu > li.current_page_parent, .menu > li.current_page_ancestor';

				if( $( activeSelector, menu ).length ){

					// remove duplicated
					$( activeSelector, menu )
						.not(':first').removeClass( 'current-menu-item current-menu-parent current-menu-ancestor current-page-ancestor current_page_item current_page_parent current_page_ancestor' );

					// remove if 1st link to section & section is not visible
					hash = $( activeSelector, menu ).find('a[data-hash]').attr( 'data-hash' );

					if( hash ){
						hash = '[data-id="'+ hash +'"]';

						if( $(hash).length && $( hash ).visible( true ) ){
							// do nothing
						} else {
							$( activeSelector, menu ).removeClass( 'current-menu-item current-menu-parent current-menu-ancestor current-page-ancestor current_page_item current_page_parent current_page_ancestor' )
								.closest('.menu > li').removeClass( 'current-menu-item current-menu-parent current-menu-ancestor current-page-ancestor current_page_item current_page_parent current_page_ancestor' );
						}
					} else {
						// do nothing
					}

				} else {

					// add to first if none is active
					var first = $( '.menu > li:first-child', menu );
					var firstA  = first.children('a');

					if( firstA.attr( 'data-hash' ) ){
						hash = firstA.attr( 'data-hash' );
						hash = '[data-id="'+ hash +'"]';

						if( $(hash).length && ( $(hash).offset().top == 0 ) ){
							first.addClass( 'current-menu-item' );
						}
					}

				}


				// click ----------

				$('#menu a[data-hash]').click(function(e){
					e.preventDefault(); // only with: body.one-page

					// active

					menu.find('li').removeClass('current-menu-item');
					$(this)
						.closest('li').addClass('current-menu-item')
						.closest('.menu > li').addClass('current-menu-item');

					var hash = $(this).attr('data-hash');
					hash = '[data-id="'+ hash +'"]';

					// mobile - sticky header - close menu

					if( $(window).width() < 768 ){
						$('.responsive-menu-toggle').removeClass('active');
						$('#Top_bar #menu').hide();
					}

					// offset

					var headerFixedAbH = $('.header-fixed.ab-show #Action_bar').innerHeight();
					var tabsHeaderH = $(hash).siblings('.ui-tabs-nav').innerHeight();

					var offset = headerFixedAbH - tabsHeaderH - 0;

					// sticky height

					var stickyH = fixStickyHeaderH();

					// FIX | Header below | 1st section
					if( $( 'body' ).hasClass( 'header-below' ) && $( '#Content' ).length ){
						if( $( hash ).offset().top < ( $( '#Content' ).offset().top + 60 ) ){
							stickyH = -1;
						}
					}

					// animate scroll

					$( 'html, body' ).animate({
						scrollTop: $( hash ).offset().top - offset - stickyH
					}, 500);

				});

			}
		}
		onePageMenu();

		/* ---------------------------------------------------------------------------
		 * Button | mark buttons with icon & label
		 * --------------------------------------------------------------------------- */

		$( 'a.button_js' ).each(function(){
			var btn = $(this);
			if( btn.find('.button_icon').length && btn.find('.button_label').length ){
				btn.addClass('kill_the_icon');
			}
		});


		/* ---------------------------------------------------------------------------
		 * Navigation Arrows | Sticky
		 * --------------------------------------------------------------------------- */

		$('.fixed-nav').appendTo( 'body' );

		/* ---------------------------------------------------------------------------
		 * IE Fixes
		 * --------------------------------------------------------------------------- */

		function checkIE(){
			// IE 9
			var ua = window.navigator.userAgent;
	        var msie = ua.indexOf("MSIE ");
	        if( msie > 0 && parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 9 ){
	        	$("body").addClass("ie");
			}
		}
		checkIE();

		/* ---------------------------------------------------------------------------
		 * Go to top
		 * --------------------------------------------------------------------------- */

		$('#back_to_top').click(function(){
			$('body,html').animate({
				scrollTop: 0
			}, 500);
			return false;
		});

		/* --------------------------------------------------------------------------------------------------------------------------
		 *
		 * $(window).resize | Debouncedresize
		 *
		 * ----------------------------------------------------------------------------------------------------------------------- */


		$(window).bind("debouncedresize", function(){

			// Header Width
			mfn_header();
		});


		/* --------------------------------------------------------------------------------------------------------------------------
		 *
		 * document.ready | Init
		 *
		 * ----------------------------------------------------------------------------------------------------------------------- */

		// Header | Width
		mfn_header();

		// Navigation | Hash
		hashNav();
	});



	/* --------------------------------------------------------------------------------------------------------------------------
	 *
	 * $(window).scroll
	 *
	 * ----------------------------------------------------------------------------------------------------------------------- */


	$(window).scroll(function(){

		// Header | Sticky
		mfn_sticky();

		// Back to top | Sticky
		backToTopSticky();

		// One Page | Scroll | Active Section
		onePageActive();

	});



	/* --------------------------------------------------------------------------------------------------------------------------
	 *
	 * $(window).load
	 *
	 * ----------------------------------------------------------------------------------------------------------------------- */


	$(window).load(function(){

		/* --------------------------------------------------------------------------------------------------------------------------
		 *
		 * window.load | Init
		 *
		 * ----------------------------------------------------------------------------------------------------------------------- */

		// Navigation | Hash
		hashNav();

	});

	$(function() {
		$( '#menu a' ).on( 'click', function(e) {
			$( '#menu a' ).attr( 'aria-current', 'false' ).find( '.hidden' ).remove();
			
			var current = $( this ).hasClass( 'current-menu-item' );
			if ( current === true ) {
				$( this ).attr( 'aria-current', 'false' ).find( '.hidden' ).remove();
			} else {
				$( this ).attr( 'aria-current', 'true' ).append( "<span class='hidden'>(current)</span>" );
			}
		});
		
		$( '.responsive-menu-toggle' ).on( 'click', function(e){
			var el = $(this);
			var expanded = el.attr( 'aria-expanded' );
			
			if ( expanded == 'true' ) {
				el.attr( 'aria-expanded', 'false' );
			} else {
				el.attr( 'aria-expanded', 'true' );
			}
		});
	});

})(jQuery);
