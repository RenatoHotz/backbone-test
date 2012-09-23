define([
  // Application.
  "app",

  // Modules.
  "modules/example",
  "modules/adtest"
],

function(app, Example, Adtest) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      ""			: "index",
      "test"		: "test",
      "programm"	: "program",
	  "programme"	: "program",
	  "adtest"		: "adtest"
    },

    index: function() {
      // Create a layout and associate it with the #main div.
      var layout = new Backbone.Layout({
        el: "#main"
      });

      // Insert the tutorial into the layout.
      layout.insertView(new Example.Views.Tutorial());
      
      // Render the layout into the DOM.
      layout.render();
    },
    
    test: function() {
    	alert('test-route');
    },
    
    program: function() {
		 alert('show program');
	},
	
	adtest: function() {
		var adtest = new Adtest.Model();
		var layout = new Backbone.Layout({
			el: 	"#main"
		});
		
		layout.setView(
			new Adtest.Views.Program({ 
				model: adtest 
			})
		);
		
		layout.render();
		
		adtest.setTitle('A scandal in Bohemia');
		//console.log(adtest);
	}
	
  });
  
  return Router;

});
