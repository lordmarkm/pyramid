(function () {
  'use strict';

  angular.module('OwlAdmin.pages.mail')
    .controller('composeBoxCtrl', composeBoxCtrl);

  /** @ngInject */
  function composeBoxCtrl(subject, to, text) {
    var vm = this;
    vm.subject = subject;
    vm.to = to;
    vm.text = text;
  }
})();
