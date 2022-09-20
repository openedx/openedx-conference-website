(function( $ ) { 'use strict';

	/**
	 Toggle size of slider wrapper based on window size
	*/
	var height = document.documentElement.clientHeight - $( '#Top_bar' ).height();
		
	$( '#slider-wrapper' ).height( height );
	$( '#slider-wrapper li' ).height( height );

	$( window ).resize(function() {
		height = document.documentElement.clientHeight - $( '#Top_bar' ).height();	
		
		$( '#slider-wrapper' ).height( height );
		$( '#slider-wrapper li' ).height( height );
	});
	
	/**
	 * Accordion
	 */
	var allPanels = $('#plenaries p').hide();
	var allHeaders = $( '#plenaries h3' );
	allHeaders.each( function() {
		$( this ).wrap( '<button aria-expanded="false"></button>' ).prepend( '<span class="dashicons dashicons-plus" aria-hidden="true"></span>' );
	});

	$('#plenaries > button').click( function() {
		allPanels.slideUp().attr( 'aria-expanded', 'false' );
		allHeaders.find( '.dashicons' ).removeClass( 'dashicons-minus' ).addClass( 'dashicons-plus' );
		var visible = $(this).next().is( ':visible' );
		if ( visible ) {
			
		} else {
			$( this ).next().slideDown();
			$( this ).attr( 'aria-expanded', 'true' );
			$( this ).find( '.dashicons' ).removeClass( 'dashicons-plus' ).addClass( 'dashicons-minus' );			
		}
		
		return false;
	});	 
	
	
}(jQuery));