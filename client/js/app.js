var app = angular.module('pandaJuice', ['lbServices']);

app.controller('rootController', ['$scope', 'User', 'Item', function($scope, User, Item) {
  console.log("Hitting controller method");

  //TODO: Take this out, just for ease of testing
  $scope.email = "admin@pandaJuice.com";
  $scope.password = "fossil";

  $scope.login = function(email, password) {
    console.log("Logging in with email: %s and password: %s", email, password);
    var loginResult = User.login({email: email, password: password},
      function(ret) {
        console.log("In the success function");
        console.log("Ret: ", ret);
        console.log("Successfully logged in user: ", ret.user);

        /*
        User.findById(ret.user.id, function(err, o) {
          console.log("Found user by userId of logged in user");
          console.log(o);
          $scope.user = o;
        });
        */

        console.log("Logged in userid: ", User.getCurrentId());
        var oreoUser = User.findById(1);
        console.log("oreoUser: ", oreoUser);

        var oreoItem = Item.findById({id: 1});
        console.log("oreoItem: ", oreoItem);

        window.oreoUser = oreoUser;
        window.oreoItem = oreoItem;
      }, 
      function(err) {
        console.log("Failed to login user. Reason: ", err);
      });

    window.loginres = loginResult;
  }

  $scope.setUsername = function(username) {
    console.log("Changing username to: ", username);

    $scope.user.username = username;

    User.upsert($scope.user, function(a,b,c) {
      console.log("callback a: ", a);
      console.log("callback b: ", b);
      console.log("callback c: ", c);
    });
  }
}]);


