'use strict';

angular.module('OwlAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'ui.slimscroll',
  'oc.lazyLoad',
  'ngResource',
  'LocalStorageModule',
  // Modules
  'OwlAdmin.theme',
  'OwlAdmin.pages',
  'pyramid.service',
  '19degrees.ngSweetAlert2',
  'OwlAdmin.pages.order'
]);
