(function () {
  'use strict';

  angular.module('pyramid.service')
    .service('orderService', orderService);

  function orderService($http, $q) {
    return {
        findMyOrders: findMyOrders
    };
    function findMyOrders() {
      //https://docs.google.com/spreadsheets/d/1_GmKqiAwNQ-7TVi5ZtFxJaSab3VcGji31msULi-LozQ/edit?usp=sharing
      let url = 'https://script.google.com/macros/s/AKfycbzHLXKYQ1glzkp0NOVFhUCRvYVXbkstXuFeGuZk50VsDRTnIFZ5/exec';

      let d = $q.defer();
      window.findMyOrders = function (orders) {
        d.resolve(orders);
      }
      $http.jsonp(url);
      return d.promise;
    }
  }

})();
