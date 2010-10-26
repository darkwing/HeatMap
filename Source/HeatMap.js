/*
---
description:     HeatMap

authors:
  - David Walsh (http://davidwalsh.name)

license:
  - MIT-style license

requires:
  core/1.2.1:   '*'

provides:
  - HeatMap
...
*/
var HeatMap = new Class({
	options: {
		event: 'click',
		load: {
			// request settings here
		},
		method: 'get',
		save: {
			// request settings here
		},
		spotClass: 'heatmap-spot',
		zone: ''/*,
		onClick: $empty,
		onSpot: $empty
		*/
	},
	Implements: [Options,Events],
	initialize: function(element,options) {
		this.element = document.id(element).setStyle('position','relative');
		this.setOptions(options);
		this.newClicks = [];
		this.oldClicks = [];
		this.attachEvents();
	},
	attachEvents: function() {
		var self = this;
		this.clickEvent = function(e) {
			var obj = self.getRelativePosition(e.page.x,e.page.y);
			obj.spot = self.createSpot(obj.x,obj.y);
			self.newClicks.push(obj);
		};
		this.element.addEvent(this.options.event,this.clickEvent);
	},
	detachEvents: function() {
		this.element.removeEvent(this.options.event,this.clickEvent);
	},
	getRelativePosition: function(x,y) {
		var position = this.element.getPosition();
		return { x: x - position.x, y: y - position.y };
	},
	load: function() {
		if(!this.loadRequest) this.loadRequest = new Request.JSON(this.options.load);
		if(!this.options.load.onSuccess && !this.loadSuccess) {
			this.loadSuccess = function(json) {
				json.each(function(click,i) {
					json[i].spot = this.createSpot(click.x,click.y);
					this.oldClicks.push(json[i]);
				},this);
			}.bind(this);
			this.loadRequest.addEvent('success',this.loadSuccess);
		}
		this.loadRequest[this.options.method]({
			load: 1,
			zone: this.options.zone
		});
		return this;
	},
	save: function(data) {
		if(!this.sendRequest) this.sendRequest = new Request.JSON(this.options.save);
		if(this.newClicks.length) {
			this.sendRequest.addEvent('success',function() {
				this.newClicks.each(function(click) {
					this.oldClicks.push(this.createSpot({ x: click.x, y:click.y }));
				},this);
				this.newClicks = [];
			}.bind(this));
			this.sendRequest[this.options.method]({
				save: 1,
				zone: this.options.zone,
				data: this.newClicks
			});
		}
		return this;
	},
	createSpot: function(x,y) {
		var spot = new Element('div',{
			'class': this.options.spotClass,
			styles: {
				top: y.toInt(),
				left: x.toInt()
			}
		}).inject(this.element);
		this.fireEvent('spot',[spot,x,y]);
		return spot;
	}
});


/* usage */
/*
window.addEvent('domready',function() {
	map = new HeatMap('ricci-map',{
		zone: 'cricci',
		save: { url: 'heat-map.php' },
		load: { url: 'heat-map.php' },
		onSpot: function(spot) {
			spot.setStyle('opacity',0).fade(1);
		}
	});
	document.id('loadButton').addEvent('click',function() {
		map.load();
	});
	document.id('saveButton').addEvent('click',function() {
		map.save();
	});
});
*/