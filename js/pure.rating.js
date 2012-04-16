/**
 * pure.rating : v.0.0.1
 * Author & copyright (c) 2012: Tim Svensen
 * Dual MIT & GPL license
 *
 * jQuery plugin that turns a single select element into a rating widget.
 * A custom 'ratingchange' event is fired whenever the select is updated
 */

;(function($) {



/**
 * rating
 */
$.fn.rating = function(options) {
      // build main options before element iteration
      // first arg is an empty object to keep from overwriting the defaults object
  var opts = $.extend({}, $.fn.rating.defaults, options),

      containerClasses = ' '+ opts.containerClasses, // add space so classes don't collide
      resetBtnOpts     = opts.resetBtnOpts,
      resetTitle       = opts.resetTitle,
      initialRating    = opts.initialRating,

      // create reset button jQuery object
      $btnReset = resetBtnOpts && $('<a class="rating-btn-reset" title="'+ resetTitle +'" />');


  // expose options after defaults have been merged 
  $.fn.rating.opts = opts;

  // iterate through each single select element and return the jQuery object for chaining
  return this.each(function() {
    var $container,
        initialSelectedValue,
        $select;

    // when not a single select element, exit out
    if (this.type !== 'select-one') { return false; }

    // when already processed, exit out
    $select = $(this);
    if ($select.hasClass('rating-processed')) { return false; }


    // hide select element then add the processed class
    $select.css('display', 'none').addClass('rating-processed');

    // begin building the rating widget
    $container = $('<div class="rating-container'+ containerClasses +'" />');

    // add the reset button when shown and position on the left
    //   we clone the object so a copy is available for each widget
    if (resetBtnOpts === 'left') { $container.append($btnReset.clone()); }

    // build items for each select option
    $select.find('option').each(function() {
      var txt;

      // when the option has a value
      if (this.value) {
        txt = $(this).text();

        // add the item
        $container.append(
          $('<a class="rating-item" title="'+ txt +'" />')
            .prop('ratingvalue', this.value) // add the option value to the item
        );
      }
    });

    // add the reset button when shown and position on the right
    //   we clone the object so a copy is available for each widget
    if (resetBtnOpts === 'right') { $container.append($btnReset.clone()); }

    // save current/initial rating
    initialSelectedValue = $select.find('option:selected').val();
    $select.prop('rating', initialSelectedValue);

    // TODO: set initial rating

    // finally add the container to the page
    $select.after($container);
  });
};



/////////////////////////////// EVENT DELEGATION

/**
 * mouseenter, mouseleave and click handlers
 *
 * delegate instead of bind to account for the situation where hundreds of
 * rating widgets exist on a page
 */
$(document).on({
  mouseenter: function(e) { rating_hovered(e); },
  mouseleave: function(e) { rating_hovered(e); },
  click:      function(e) { rating_clicked(e); }
}, '.rating-item, .rating-btn-reset');



/////////////////////////////// PRIVATE FUNCTIONS

// Remember: These private functions will be hoisted to the top
// of the anon function as they are saved as variables

    /**
     * rating_hovered()
     */
var rating_hovered = function(e) {
      var $link = $(e.target), // item or reset button
          // add class on mouse enter, remove on mouse leave
          addRemoveClass = (e.type === 'mouseenter') ? 'addClass' : 'removeClass';

      // when not the reset button, then it's an item
      if (!$link.hasClass('rating-btn-reset')) {
        // grab all the items and the one hovered
        $link = $link.prevAll().andSelf()
          .not('.rating-btn-reset');
      }

      // add/remove hovered class
      $link[addRemoveClass]('rating-hovered');
    },


    /**
     * rating_clicked()
     */
    rating_clicked = function(e) {
      var $link    = $(e.target),
          $select  = $link.parents('.rating-container').prev(),
          ratingValue = $link.prop('ratingvalue'), // store the clicked rating
          resetVal;

      // when the reset button
      if ($link.hasClass('rating-btn-reset')) {
        resetVal = $.fn.rating.opts.resetVal;

        // clear the rating
        $link.siblings().removeClass('rating-filled');

        update_select($link, $select, resetVal);
      }

      // otherwise an item and when the data has changed
      else if ($select.prop('rating') !== ratingValue) {
        // fill items, including the clicked one
        $link.prevAll().andSelf()
          .not('.rating-btn-reset')
          .addClass('rating-filled');

        // empty the rest of the items
        $link.nextAll()
          .not('.rating-btn-reset')
          .removeClass('rating-filled');

        update_select($link, $select, ratingValue);
      }
    },


    /**
     * update_select()
     *
     * @$link: the item or reset button
     * @$select: select element the rating widget relates
     * @ratingValue: value of the rating that was clicked
     */
    update_select = function($link, $select, ratingValue) {
      // fire a custom 'rating change' event
      $link.trigger('ratingchange', {rating: ratingValue});

      // reset rating
      $select.prop('rating', ratingValue)
        // remove selected option
        .find('option:selected').removeAttr('selected')
        .end()

        // then select the rating option
        .find('option[value="'+ ratingValue +'"]').attr('selected','selected')
        .end()

        // then trigger a change so other js click event handlers may act on the element
        .trigger('change');
    };



/////////////////////////////// PUBLIC FUNCTIONS

/**
 * define and expose function
 */
/*$.fn.rating.NEW_FUNCTION = function(txt) {
  return true;
};*/



/////////////////////////////// PUBLIC VARIABLES

/**
 * plugin defaults
 */
$.fn.rating.defaults = {
  containerClasses: '', // optional classes to append to the container for themeing
  resetBtnOpts: 'left', // false hides the button, 'left' or 'right' sets the position of the button
  resetVal:     '', // default select option value (usually '' - an empty string)
  resetTitle:   'Reset',

  initialRating: 0
};



})(jQuery);
