angular.module('app.read', [])

.controller('Read', ['$scope','$state', '$http', function($scope, $state, $http) {
  const getPosts = function() {
    $scope.data = {};
    return $http({
      method: 'GET',
      url: '/posts'
    }).then(function(resp) {
      return resp.data;
    }).then(function(missives){
      console.log(missives)
      $scope.posts = missives.filter(function(missive) {
        return missive.share;
      });
    }).catch()
  }
  getPosts();

}]);
