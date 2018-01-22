(function () {
  'use strict';

  angular.module('OwlAdmin.pages.order')
      .controller('OrrderListCtrl', OrrderListCtrl);

  /** @ngInject */
  function OrrderListCtrl(orderService, orders) {
    var vm = this;
    vm.smartTablePageSize = 10;
    vm.orders = orders;
  }

})();

