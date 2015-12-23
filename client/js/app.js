var app = angular.module('pandaJuice', ['lbServices']);

app.controller('rootController', ['$scope', 'User', function($scope, User) {
  console.log("Hitting controller method");
  $scope.oreo = "Oreo Bro";
  $scope.email = "admin@pandaJuice.com";
  $scope.password = "fossil";

  $scope.login = function(email, password) {
    console.log("Logging in with email: %s and password: %s", email, password);
    User.login({email: email, password: password}).$promise.then(
      function(ret) {
        console.log("Successfully logged in user: ", ret.user);
        $scope.user = ret.user;
      }, 
      function(err) {
        console.log("Failed to login user. Reason: ", err);
      });
  }

  $scope.setUsername = function(username) {
    console.log("Changing username to: ", username);
    User.upsert({id: $scope.user.id, username: username}, function(a,b,c) {
      console.log("callback a: ", a);
      console.log("callback b: ", b);
      console.log("callback c: ", c);
    });
  }
}]);


