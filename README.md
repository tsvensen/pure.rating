#pure.rating

jQuery plugin that turns a single select element into a rating widget.

A custom 'ratingchange' event is fired whenever the select is updated.


## Plugin Options
<pre>
$('#rating-widget').rating({
	containerClasses: '',	// optional classes to append to the container
	resetBtnOpts: 'left',	// false hides the button, 'left' or 'right' sets the position of the button
	resetVal:		 '',			// default select option value (usually '' - an empty string)
	resetTitle:	 'Reset', // title of the reset button
	initialRating: 0			 // initial value of the rating (not yet implemented)
});
</pre>


## Example
<pre>
// add to one select element
$('#rating-widget').rating();

// add to multiple select elements
$('.rating-widget-multiple').rating();

// add the reset button on the right
$('#rating-widget-right').rating({resetBtnOpts: 'right'});

// remove the reset button
$('#rating-widget-no-btn').rating({resetBtnOpts: false});

// add a custom class to the rating container
$('#rating-widget-container-classes').rating({containerClasses: 'my-star-widget'});

// custom handling of the ratingchange event
$(document).on('ratingchange', function(e) {
	console.log('ratingchanged', e.target);
});
</pre>


## ToDo

Add initial images sprite
Then add a few "themes" - css and image sprites
Improve documentation
Set initial rating - abstract a set_rating function from rating_clicked()
Integrate with simple tooltip plugin once it's finished

ReThink the "reset" functionality
1. keep the cancel btn like it is now
2. don't have a cancel btn, when clicking selected it resets
3. add 1 and 2 as plugins
