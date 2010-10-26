Class: HeatMap {#HeatMap}
=====================================

HeatMap allows you to MooTools HeatMap allows you to detect, load, save, and render user clicks on any given area of the page.

### Implements:

Options, Events

HeatMap Method: constructor {#HeatMap:constructor}
---------------------------------------------------------------


### Syntax:

	var myHeatMap = new HeatMap(element,options);

### Arguments:

1. element - (*string*)  An element (or element id) for which to use as a map.
2. options - (*object*)  An object containing the HeatMap instance's options.

### Options:
* event - (*string*, defaults to 'event') </em> the event to listen for -- defaults to click.
* load - (*object*, defaults to {})</em> the Request.JSON options object for loading spots.
* method - (*string*, defaults to "get")</em> the Request.JSON request type.
* save - (*object*, defaults to {}) </em> the Request.JSON options object for saving spots.
* spotClass - (*string*, defaults to 'heatmap-spot')</em> the CSS class for styling a spot.
* zone - (*string*, defaults to '') </em>the "zone" by which the click will be saved under; especially important if more than one spot is one the page..

### Returns:

A HeatMap instance.


### Events:

### spot

* (*function*) Function to execute when a spot is created

### Signature

	onSpot(image)
	
	
HeatMap Method: save {#HeatMap:save}
-----------------------------------------------------

### Syntax:

	myHeatMap.save()

### Description:
	
	Saves all new spots via Request.JSON.


HeatMap Method: load {#HeatMap:load}
-----------------------------------------------------

### Syntax:

	myHeatMap.load()

### Description:

	Loads all old spots via Request.JSON.