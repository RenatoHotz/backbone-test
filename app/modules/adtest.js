define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Adtest = app.module();

  // Adtest model.
  Adtest.Model = Backbone.Model.extend({
	  defaults: {
		  title: '',
		  completed: false
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
		  //this.set('completed', !this.get('completed'));
		  this.set({completed: !this.get('completed')});
		  console.log('Completed: ' + this.get('completed'));
	  }
    
  });

  // Adtest collection.
  Adtest.Collection = Backbone.Collection.extend({
	  model: Adtest.Model
  });
  
  //This will fetch the tutorial template and render it.
  Adtest.Views.Program = Backbone.View.extend({
	  template: "adtest/example",

	  initialize: function() {
		  this.model.on("change", this.render, this);
	  },
    
	  events: {
		  "click img":      "station",
		  "click strong":   "title"
	  },

	  station: function() {
		  console.log('station');
		  this.remove().render();
	  },
      
	  title: function() {
		  //this.render();
		  this.model.toggle();
		  //console.log(Backbone.history.fragment);
	  },
      
	  render: function() {
		  console.log('render');
	  }
  });

  // Return the module for AMD compliance.
  return Adtest;

});
