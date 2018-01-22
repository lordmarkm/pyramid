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
                  'app/pages/order/order.list.ctrl.js',
                ]);
            },
            orders: function ($q, orderService) {
              let deferred = $q.defer();
              orderService.findMyOrders().then(function (resp) {
                deferred.resolve(resp.orders);
              });
              return deferred.promise;
            }
        }
      });
  }
})();
