(function () {
  'use strict';

  angular.module('OwlAdmin.pages.dashboard')
      .directive('popularApp', popularApp);

  /** @ngInject */
  function popularApp() {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/dashboard/popularApp/popularApp.html'
    };
  }
})();
