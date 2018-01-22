(function () {
    'use strict';

    angular.module('OwlAdmin.theme.components')
        .controller('pageTopCtrl', pageTopCtrl);

    function pageTopCtrl($scope, localStorageService, $window, authService) {
        var vm = this;
        vm.imageUrl = 'assets/img/app/profile/unknown_user.png';
        vm.username = 'Anonymous';
        authService.getProfile().then(function (u) {
            if (u.signed_in) {
                vm.imageUrl = u.profile.getImageUrl();
                vm.username = u.profile.getName();
            }
        });
    }

})();

