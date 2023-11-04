(function () {
  ("use strict");

  angular
    .module("ControllerAsApp", [])
    .controller("ShoppingListController1", ShoppingListController1)
    .controller("ShoppingListController2", ShoppingListController2)
    .factory("ShoppingListFactory", ShoppingListFactory);

  // LIST #1 - controller
  ShoppingListController1.$inject = ["ShoppingListFactory"];
  function ShoppingListController1(ShoppingListFactory) {
    var list1 = this;

    // Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory();

    list1.items = shoppingList.getItems();

    list1.itemName = "";
    list1.itemQuantity = "";

    list1.addItem = function () {
      shoppingList.addItem(list1.itemName, list1.itemQuantity);
    };

    list1.removeItem = function (itemIndex) {
      shoppingList.removeItem(itemIndex);
    };
  }

  // LIST #3 - service
  ShoppingListController3.$inject = ["ShoppingListService"];
  function ShoppingListController3(ShoppingListService) {
    let list3 = this;
    list3.items = ShoppingListService.getItems();

    list3.itemName = "";
    list3.itemQuantity = "";

    list3.addItem = function () {
      try {
        ShoppingListService.addItem(list3.itemName, list3.itemQuantity);
      } catch (error) {
        list3.errorMessage = error.message;
      }
    };

    list3.removeItem = function (itemIndex) {
      ShoppingListService.removeItem(itemIndex);
    };
  }

  // LIST #2 - controller
  ShoppingListController2.$inject = ["ShoppingListFactory"];
  function ShoppingListController2(ShoppingListFactory) {
    var list2 = this;

    // Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory(3);

    list2.items = shoppingList.getItems();

    list2.itemName = "";
    list2.itemQuantity = "";

    list2.addItem = function () {
      try {
        shoppingList.addItem(list2.itemName, list2.itemQuantity);
      } catch (error) {
        list2.errorMessage = error.message;
      }
    };

    list2.removeItem = function (itemIndex) {
      shoppingList.removeItem(itemIndex);
    };
  }

  // If not specified, maxItems assumed unlimited
  function ShoppingListService(maxItems) {
    var service = this;

    // List of shopping items
    var items = [];

    service.addItem = function (itemName, quantity) {
      if (
        maxItems === undefined ||
        (maxItems !== undefined && items.length < maxItems)
      ) {
        var item = {
          name: itemName,
          quantity: quantity,
        };
        items.push(item);
      } else {
        throw new Error("Max items (" + maxItems + ") reached.");
      }
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };

    service.getItems = function () {
      return items;
    };
  }

  function ShoppingListFactory() {
    var factory = function (maxItems) {
      return new ShoppingListService(maxItems);
    };

    return factory;
  }

  function ShoppingListServiceProvider() {
    let provider = this;

    provider.defaults = {
      maxItems: 10,
    };

    provider.$get = function () {
      let shoppingList = new ShoppingListService(provider.defaults.maxItems);
      return shoppingList;
    };
  }
})();
