angular.module('wp', [
    'ui.router',
    'app.write',
    'app.read',
    'app.menu'
  ])

.config(function($stateProvider, $urlRouterProvider) { 

  $stateProvider

  .state('write', {
    url: '/',
    views: {
      '': {
        templateUrl: 'views/write/write.html',
        controller: 'Write'
      },
      'menu@write': {
        templateUrl: 'views/menu/menu.html',
        controller: 'Menu'
      }
    }
  })

  .state('read', {
    url: '/show',
    views: {
      '': {
        templateUrl:'views/read/read.html',
        controller: 'Read'
      },
      'menu@read': {
        templateUrl: 'views/menu/menu.html',
        controller: 'Menu'
      }
    }
  });

  $urlRouterProvider.otherwise('/');

});