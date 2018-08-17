(function ($) {
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
}(jQuery));