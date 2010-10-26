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
var HeatMap=new Class({options:{event:"click",load:{},method:"get",save:{},spotClass:"heatmap-spot",zone:""},Implements:[Options,Events],initialize:function(b,a){this.element=document.id(b).setStyle("position","relative");this.setOptions(a);this.newClicks=[];this.oldClicks=[];this.attachEvents()},attachEvents:function(){var a=this;this.clickEvent=function(c){var b=a.getRelativePosition(c.page.x,c.page.y);b.spot=a.createSpot(b.x,b.y);a.newClicks.push(b)};this.element.addEvent(this.options.event,this.clickEvent)},detachEvents:function(){this.element.removeEvent(this.options.event,this.clickEvent)},getRelativePosition:function(b,c){var a=this.element.getPosition();return{x:b-a.x,y:c-a.y}},load:function(){if(!this.loadRequest){this.loadRequest=new Request.JSON(this.options.load)}if(!this.options.load.onSuccess&&!this.loadSuccess){this.loadSuccess=function(a){a.each(function(c,b){a[b].spot=this.createSpot(c.x,c.y);this.oldClicks.push(a[b])},this)}.bind(this);this.loadRequest.addEvent("success",this.loadSuccess)}this.loadRequest[this.options.method]({load:1,zone:this.options.zone});return this},save:function(a){if(!this.sendRequest){this.sendRequest=new Request.JSON(this.options.save)}if(this.newClicks.length){this.sendRequest.addEvent("success",function(){this.newClicks.each(function(b){this.oldClicks.push(this.createSpot({x:b.x,y:b.y}))},this);this.newClicks=[]}.bind(this));this.sendRequest[this.options.method]({save:1,zone:this.options.zone,data:this.newClicks})}return this},createSpot:function(a,c){var b=new Element("div",{"class":this.options.spotClass,styles:{top:c.toInt(),left:a.toInt()}}).inject(this.element);this.fireEvent("spot",[b,a,c]);return b}});