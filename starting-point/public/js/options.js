'use strict';
/* global $ tripModule attractionsModule hotels restaurants activities */

/**
 * This module fills the `select` tags with `option`s.
 * It runs immediately upon document ready (not called by other modules).
 * Each `option` displays the name of an attraction and is has a value of
 * that attraction's id. Selecting an option looks up the attraction by id,
 * then tells the trip module to add the attraction.
 */

$(function () {

    // jQuery selects
    var $optionsPanel = $('#options-panel');
    var $hotelSelect = $optionsPanel.find('#hotel-choices');
    var $restaurantSelect = $optionsPanel.find('#restaurant-choices');
    var $activitySelect = $optionsPanel.find('#activity-choices');

  // ~~~~~~~~~~~~~~~~~~~~~~~
    // This looks like a great place to start AJAX work with a request for all attractions. Don't forget that these kinds of requests are async, so we won't have all of the attractions until it comes back, but once it comes back we can make the option tags
  // ~~~~~~~~~~~~~~~~~~~~~~~
    var hotels = $.ajax({
        method: 'GET',
        url: '/api/hotels',
        // data: someDataToSend, // e.g. for POST requests
      })
      .then(function (responseData) {
        console.log(responseData)
        attractionsModule.loadEnhancedAttractions('hotels', responseData);
        responseData.forEach(makeOption, $hotelSelect);
      })
      .catch(function (errorObj) {
        // some code to run if the request errors out
        console.log(errorObj);
      });

    var restaurants = $.ajax({
        method: 'GET',
        url: '/api/restaurants',
        // data: someDataToSend, // e.g. for POST requests
      })
      .then(function (responseData) {
        attractionsModule.loadEnhancedAttractions('restaurants', responseData);
        responseData.forEach(makeOption, $restaurantSelect);
      })
      .catch(function (errorObj) {
        // some code to run if the request errors out
        console.log(errorObj);
      });

    var activities = $.ajax({
        method: 'GET',
        url: '/api/activities',
        // data: someDataToSend, // e.g. for POST requests
      })
      .then(function (responseData) {
        attractionsModule.loadEnhancedAttractions('activities', responseData);
        responseData.forEach(makeOption, $activitySelect);
      })
      .catch(function (errorObj) {
        // some code to run if the request errors out
        console.log(errorObj);
      });


    // make all the option tags (second arg of `forEach` is a `this` binding)
    // hotels.forEach(makeOption, $hotelSelect);
    // restaurants.forEach(makeOption, $restaurantSelect);
    // activities.forEach(makeOption, $activitySelect);

    // Once you've made AJAX calls to retrieve this information,
    // call attractions.loadEnhancedAttractions in the fashion
    // exampled below in order to integrate it.
    // attractionsModule.loadEnhancedAttractions('hotels', hotels);
    // attractionsModule.loadEnhancedAttractions('restaurants', restaurants);
    // attractionsModule.loadEnhancedAttractions('activities', activities);

    function makeOption(databaseAttraction) {
        var $option = $('<option></option>') // makes a new option tag
          .text(databaseAttraction.name)
          .val(databaseAttraction.id);
        this.append($option); // add the option to the specific select
    }

    // what to do when the `+` button next to a `select` is clicked
    $optionsPanel.on('click', 'button[data-action="add"]', function () {
        var $select = $(this).siblings('select');
        var type = $select.data('type'); // from HTML data-type attribute
        var id = $select.find(':selected').val();
        // get associated attraction and add it to the current day in the trip
        var attraction = attractionsModule.getByTypeAndId(type, id);
        tripModule.addToCurrent(attraction);
    });

});
