var app = require('../server/server');

var datasource = app.datasources.db;

var models = app.models();
var modelNames = models.map(function(o){return o.modelName});

//Warning. This deletes data in the db
console.log("Migrating DB. Warning, this will delete all data");
datasource.automigrate(modelNames, seedData);

function seedData() {
  console.log("Done migrating data");

  var Sale = app.models.Sale;
  var Item = app.models.Item;
  var SaleItem = app.models.SaleItem;

  var date = new Date();
  var nextDay = new Date(date.getTime() + (1000 * 3600 * 24))
  Sale.create({start: date, end: nextDay}, function(err, sale) {
    console.log("Sale created: ", sale);

    Item.create({name: "Seed Item 1", description: "This is a great item!"}, function(err, item) {
      console.log("Item created: ", item);

      SaleItem.create({saleId: sale.id, itemId: item.id, quantity: 100, cost: 1000}, function(err, si) {
        console.log("Sale Item created: ", si);
      });
    });
  });

  var User = app.models.User;
  User.create({email: "admin@pandaJuice.com", password: "fossil"}, function(err, user) {
    console.log("User created: ", user);
  });
}

