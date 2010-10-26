HeatMap
=========

HeatMap is a MooTools class that allows you to detect, load, save, and render clicks on a given element.  Saving and loading is done via AJAX and is as simple as calling load and save methods.

![Screenshot](http://davidwalsh.name/dw-content/heatmap.jpg)


How to Use
----------

HeatMap should be initialized during the DOMReady event.  There are several options you may choose from.

	#JS
	/* HeatMap instance */
	var map = new HeatMap('ricci-map',{
		zone: 'cricci',
		save: { url: 'heat-map.php' },
		load: { url: 'heat-map.php' },
		onSpot: function(spot) {
			spot.setStyle('opacity',0).fade(1);
		}
	});
	document.id('loader').addEvent('click',function() {
		map.load();
	});
	document.id('saver').addEvent('click',function() {
		map.save();
	});
	

For specific usage and options, please read the documentation or visit [http://davidwalsh.name/js/heatmap](http://davidwalsh.name/js/heatmap)