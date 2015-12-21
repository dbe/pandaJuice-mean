var app = require('../server/server');

var models = app.models();

//Warning. This deletes data in the db
models.forEach(function(model) {
  console.log("Automigrating: " + model.modelName);

  model.dataSource.automigrate(model.modelName);
});
