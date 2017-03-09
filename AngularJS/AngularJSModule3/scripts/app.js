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

            narrower.found = [];

            if (narrower.searchTerm == '') {
                console.log('Nothing found');
            }

            searcher.getMatchedMenuItems(narrower.searchTerm).
            then(
            function success(result) {
                narrower.found = result;
            }
            );
        };

        narrower.remove = function (index) {
            narrower.found.splice(index, 1);
        }

        narrower.isListEmpty = function () {
            return narrower.found.length > 0;
        }
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
            templateUrl: 'search_list.html',
            //template: `
            //    <div class ="search_item">
            //        <table>
            //            <tr ng-repeat="item in dirCtrl.items">
            //                <td>
            //                {{item.short_name}}
            //                </td>
            //                <td>
            //                {{item.name}}
            //                </td>
            //                <td>
            //                {{item.description}}
            //                </td>
            //                <td>
            //                    <button ng-click="dirCtrl.onRemove({index: $index});">Dont want this one!</button>
            //                </td>
            //            </tr>
            //        </table>
            //        <div class ="error" ng-if="dirCtrl.items.length == 0">Nothing found</div>
            //    </div>
            //          `,
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'dirCtrl',
            bindToController: true
        };

        return ddo;
    }
})();