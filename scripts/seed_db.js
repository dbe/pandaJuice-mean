var app = require('../server/server');

var datasource = app.datasources.db;

var models = app.models();
var modelNames = models.map(function(o){return o.modelName});

//Warning. This deletes data in the db
datasource.automigrate(modelNames, seedData);

function seedData(a, b, c) {
  datasource.disconnect();

  console.log("Done migrating data");
}
