(function () {
    'use strict'

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LCController);

    LCController.$inject = ['$scope'];

    function LCController($scope) {
        $scope.InputItems = '';
        $scope.Message = '';
        $scope.textColor = '';
        $scope.borderColor = '';

        $scope.checkItems = function () {

            var itemList = $scope.InputItems;
            var items = itemList.split(',');
            var cnt = 0;
            $scope.textColor = 'redTxt';
            $scope.borderColor = 'redBorder';
            $scope.Message = '';

            for (var i = 0; i < items.length; i++) {
                if (items[i].trim().length > 0) {
                    cnt++;
                }
            }

            if (cnt === 0) {
                $scope.Message = 'Please enter data first!';
            }
            else if (cnt <= 3) {
                $scope.Message = 'Enjoy!';
                $scope.textColor = 'greenTxt';
                $scope.borderColor = 'greenBorder';
            }
            else {
                $scope.Message = 'Too Much!';
                $scope.textColor = 'greenTxt';
                $scope.borderColor = 'greenBorder';
            }
        };
    }

})();