(function () {
  "use strict";

  angular
    .module("myFirstApp", [])

    .controller("MyFirstController", function ($scope) {
      $scope.name = "John";
      $scope.lastName = "Doe";
      console.log($scope.lastName);
      $scope.sayHello = () => {
        return "Hello Coursera";
      };
    });
})();
