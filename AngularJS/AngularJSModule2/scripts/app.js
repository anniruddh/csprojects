(function () {
    'use strict'

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(CheckOffService) {
        var ToBuy = this;

        ToBuy.BuyList = CheckOffService.getToBuyList();

        ToBuy.markItemAsBought = function (index) {
            CheckOffService.moveItem(index);
        }
    };

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(CheckOffService) {
        var Bought = this;

        Bought.BoughtList = CheckOffService.getBoughtList();
    };

    function ShoppingListCheckOffService() {
        var Service = this;

        Service.buyList = [
            { Name: "Cookies", Qty: 35 },
            { Name: "Sandwiches", Qty: 10 },
            { Name: "Pizzas", Qty: 30 },
            { Name: "Cup Cakes", Qty: 15 },
            { Name: "Energy Bars", Qty: 25 }
        ];

        Service.boughtList = [];

        Service.getToBuyList = function () {
            return Service.buyList;
        };

        Service.getBoughtList = function () {
            return Service.boughtList;
        };

        Service.moveItem = function (index) {
            if (index != 'undefined') {
                Service.boughtList.push(Service.buyList[index]);
                Service.buyList.splice(index, 1);
            }
        }
    };
})();