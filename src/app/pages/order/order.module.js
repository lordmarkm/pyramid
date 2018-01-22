(function () {
  'use strict';

  angular.module('OwlAdmin.pages.order', ['pyramid.service'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('order-list', {
        url: '/order-list',
        templateUrl: 'app/pages/order/order-list.html',
        title: 'My Orders',
        sidebarMeta: {
          icon: 'fa fa-money',
          order: 80,
        },
        controller: 'OrrderListCtrl',
        controllerAs: 'vm',
        access: ['ORDER_VIEW'],
        resolve: {
            lazyLoad: function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'smart-table',
                  'app/services/order.service.js',
                  'app/pages/order/order.list.ctrl.js',
                ]);
            }
        }
      });
  }
})();
