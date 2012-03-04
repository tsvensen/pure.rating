#pure.rating

jQuery plugin that turns a single select element into a rating widget.

A custom 'ratingchange' event is fired whenever the select is updated.


## Plugin Options
<pre>
// Default options
$('#rating-widget').rating({
	containerClasses: '',	// optional classes to append to the container
	resetBtnOpts:	'left',	// false hides the button, 'left' or 'right' sets the position of the button
	resetVal:		'',		// default select option value (usually '' - an empty string)
	resetTitle:		'Reset',// title of the reset button
	initialRating:	0		// initial value of the rating (not yet implemented)
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

<pre>
// Change all the default options
$('#rating-widget').rating({
	containerClasses: 'my-theme',	// add 'my-theme' to the rating container
	resetBtnOpts:	false,			// hide the button, 'left' or 'right' sets the position of the button
	resetVal:		'myvalue',		// default select option value (usually '' - an empty string)
	resetTitle:		'Reset to Zero',// title of the reset button
	initialRating:	3				// set the initial value to 3 (not yet implemented)
});
</pre>


## ToDo

* Add initial images sprite
* Then add a few "themes" - css and image sprites
* Add a usage section, include jQuery dependancy and simple ordering of script tags
* Improve documentation
* Set initial rating - abstract a set_rating function from rating_clicked()
* Integrate with simple tooltip plugin once it's finished
* ReThink the "reset" functionality
	1. keep the cancel btn like it is now
	2. don't have a cancel btn, when clicking selected it resets
	3. add 1 and 2 as plugins
