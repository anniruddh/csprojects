(function () {
    'use strict'

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(searcher) {
        var narrower = this;
        var found = [];
        var searchTerm = '';

        narrower.find = function () {

            if (narrower.searchTerm == '') {
                console.log('Nothing found');
            }
            else {
                searcher.getMatchedMenuItems(narrower.searchTerm).
                then(
                function success(result) {
                    narrower.found = result;
                }
                );
            }
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var searcher = this;

        searcher.getMatchedMenuItems = function (searchTerm) {

            return $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
            }).then(function success(response) {
                var items = response.data;
                var result = [];
                console.log(items);

                for (var i = 0; i < items.menu_items.length; i++) {
                    var menu = items.menu_items[i];
                    if (menu.description.indexOf(searchTerm) != -1) {
                        result.push(menu);
                    }
                }

                console.log(result);
                return result;
            },
            function error() {
            });
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            //templateUrl: 'search_list.html',
            template: '       <ol><li ng-repeat="item in narrower.found">{{item.Description}} <button>Dont want this one!</button> </li> </ol>',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'found',
            bindTocontroller: true
        };

        return ddo;
    }
})();