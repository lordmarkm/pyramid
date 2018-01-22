(function () {
  'use strict';

  angular.module('OwlAdmin.pages.user', ['mynt.service'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('user', {
        url: '/user/list',
        templateUrl: 'app/pages/user/list.html',
          title: 'User List',
          sidebarMeta: {
            icon: 'fa fa-user',
            order: 4,
          },
          controller: 'UserListCtrl',
          controllerAs: 'vm',
          access: ['ROLE_ADMIN', 'USER_LIST'],
          resolve: {
              lazyLoad: function($ocLazyLoad) {
                  return $ocLazyLoad.load([
                    'smart-table',
                    'app/pages/user/UserListCtrl.js',
                    'app/services/userService.js'
                  ]);
              }
          }
      });
    $urlRouterProvider.when('/user/', 'user/list');
    $urlRouterProvider.when('/user', 'user/list');
  }
})();
