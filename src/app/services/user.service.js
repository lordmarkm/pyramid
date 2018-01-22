(function () {
  'use strict';

  angular.module('pyramid.service')
    .service('userService', userService);

  function userService($resource, constants) {
    return $resource(constants.paymentGatewayUrl + '/api/payment/user', {}, {
        delete: { method: 'DELETE', id: '@id', url: constants.paymentGatewayUrl + '/api/payment/user/:id'}
    });
  }

})();
