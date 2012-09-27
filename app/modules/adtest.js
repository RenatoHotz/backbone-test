define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {
	//require.ready(function () {
		// Create a new module.
		var Adtest = app.module();

		// Adtest model.
		Adtest.Model = Backbone.Model.extend({
			defaults: {
				title: '',
				completed: false,
				changeCounter: 0
			},
	  
			initialize: function() { 
				console.log('model init'); 
				this.on("change:title", function(){
					var title = this.get("title");
					console.log("Adtest Model title has been changed to.. " + title);
				});
			},
	  
			setTitle: function(newTitle){
				this.set({ title: newTitle });
			},
	  
			// Toggle the `completed` state
			toggle: function() {
				var changeCounter = this.set("changeCounter", (this.get("changeCounter")+1)).get('changeCounter');
				
				this.set({completed: !this.get('completed')});
				console.log('Completed: ' + this.get('completed'));
				
				this.setTitle('test ' + changeCounter);
				
				//writeCapture.writeOnGetElementById = true;
				//var adTagString = '<script type="text/javascript" src="http://ad.dc2.adtech.de/addyn/3.0/780/4043698/0/1999/ADTECH;loc=100;target=_blank;key=key1+key2+key3+key4;alias=;sub1=[subst];grp='+window.adgroupid+';misc='+new Date().getTime()+';"><\/script>';
				//writeCapture.html('#asyncPlaceholder_4043698_UID', adTagString);
			}
    
		});

		// Adtest collection.
		Adtest.Collection = Backbone.Collection.extend({
			model: Adtest.Model
		});
  
		//This will fetch the adtest template and render it.
		Adtest.Views.Program = Backbone.View.extend({
			template: "adtest/example",
	  
			defaults: {
				title: '',
				completed: false
			},
	  
			initialize: function() {
				this.model.on("change", this.onChange, this);
			},
    
			events: {
				"click img":      "station",
				"click strong":   "title"
			},

			onChange: function() {
				console.log('change');
				this.render();
			},
			
			station: function() {
				console.log('station');
				this.remove().render();
			},
      
			title: function() {
				//this.render();
				this.model.toggle();
				//console.log(Backbone.history.fragment);
				writeCapture.writeOnGetElementById = true;
				var adTagString = '<script type="text/javascript" src="http://ad.dc2.adtech.de/addyn/3.0/780/4043698/0/1999/ADTECH;loc=100;target=_blank;key=key1+key2+key3+key4;alias=;sub1=[subst];grp='+window.adgroupid+';misc='+new Date().getTime()+';"><\/script>';
				writeCapture.html('#asyncPlaceholder_4043698_UID', adTagString);
			},
      
			render: function() {
				console.log('render');
				return this;
			}
		});

		// Return the module for AMD compliance.
		return Adtest;
	//});
});
