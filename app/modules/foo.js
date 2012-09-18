define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Foo = app.module();

  // Default model.
  Foo.Model = Backbone.Model.extend({
  
  });

  // Default collection.
  Foo.Collection = Backbone.Collection.extend({
    model: Foo.Model
  });

  // Return the module for AMD compliance.
  return Foo;

});
