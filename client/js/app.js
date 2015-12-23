var app = angular.module('pandaJuice', ['lbServices']);

app.controller('rootController', ['$scope', 'Customer', 'Item', function($scope, Customer, Item) {
  console.log("Hitting controller method");

  //TODO: Take this out, just for ease of testing
  $scope.email = "admin@pandaJuice.com";
  $scope.password = "fossil";

  $scope.login = function(email, password) {
    console.log("Logging in with email: %s and password: %s", email, password);
    var loginResult = Customer.login({email: email, password: password},
      function(ret) {
        console.log("In the success function");
        console.log("Ret: ", ret);
        console.log("Successfully logged in customer: ", ret.customer);
        window.ret = ret;

        console.log("Logged in customer id: ", Customer.getCurrentId());
        var oreoCustomer = Customer.findById({id: 1});
        console.log("oreoCustomer: ", oreoCustomer);

        var oreoItem = Item.findById({id: 1});
        console.log("oreoItem: ", oreoItem);

        window.oreoCustomer = oreoCustomer;
        window.oreoItem = oreoItem;
      }, 
      function(err) {
        console.log("Failed to login customer. Reason: ", err);
      });

    window.loginres = loginResult;
  }

  $scope.setUsername = function(username) {
    console.log("Changing username to: ", username);

    $scope.customer.username = username;

    Customer.upsert($scope.customer, function(a,b,c) {
      console.log("callback a: ", a);
      console.log("callback b: ", b);
      console.log("callback c: ", c);
    });
  }
}]);


