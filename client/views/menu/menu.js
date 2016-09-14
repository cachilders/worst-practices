angular.module('app.menu', [])

.controller('Menu', ['$scope','$state', function($scope, $state) {

  $scope.read = function() {
    $state.go('read');
  };

  $scope.write = function() {
    $state.go('write');
  };

}]);
