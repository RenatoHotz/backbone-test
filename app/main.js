require([
  // Application.
  "app",

  // Main Router.
  "router"
],

function(app, Router) {

  // Define your master router on the application namespace and trigger all
  // navigation from this instance.
  app.router = new Router();

  // Trigger the initial route and enable HTML5 History API support, set the
  // root folder to '/' by default.  Change in app.js.
  Backbone.history.start({ pushState: true, root: app.root, silent: false });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
	    var href, root, navRoute;
	   
	    // Check for a data-reload attribute to force history-reload
	    if ($(evt.target).data('reload') === true) {
	    	evt.preventDefault();
			Backbone.history.loadUrl(Backbone.history.fragment);
			return;
		}
	    
	    // Get the absolute anchor href.
	    href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
	    // Get the absolute root.
	    root = location.protocol + "//" + location.host + app.root;
	    
	    // Ensure the root is part of the anchor href, meaning it's relative.
	    if (href.prop && href.prop.slice(0, root.length) === root) {
	    	// make absolute paths on the same domain navigate-able as well
	    	navRoute = href.prop.slice(root.length, href.prop.length);
	    	// Stop the default event to ensure the link will not cause a page
	    	// refresh.
	    	evt.preventDefault();
	    	// `Backbone.history.navigate` is sufficient for all Routers and will
	    	// trigger the correct events. The Router's internal `navigate` method
	    	// calls this anyways.  The fragment is sliced from the root.
	    	Backbone.history.navigate(navRoute, {trigger: true, replace: false});
	    }
  });

});
