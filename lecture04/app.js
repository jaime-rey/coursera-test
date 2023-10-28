(function () {
  "use strict";

  angular
    .module("myFirstApp", [])

    .controller("MyFirstController", function () {
      this.firstName = "John";
      this.lastName = "Doe";
      console.log(this.firstName);
    });
})();
