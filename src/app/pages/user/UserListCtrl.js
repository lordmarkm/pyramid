(function () {
  'use strict';

  angular.module('OwlAdmin.pages.user')
      .controller('UserListCtrl', UserListCtrl);

  /** @ngInject */
  function UserListCtrl($scope, $rootScope, $window, localStorageService, toastr, sweetAlert, userService) {
   var vm = this;
   var page;
   var sort;
   var term;
   vm.merchants = [];
   vm.tablePageSize = 10;

   vm.activeFilters = [
    {value: '', label: 'All'},
    {value: 'false', label: 'Inactive'},
    {value: 'true', label: 'Active'}
   ];

   console.info(localStorageService);
   if (localStorageService.isSupported) {
     if (localStorageService.get('userListFilter') !== null) {
       vm.filters = localStorageService.get('userListFilter');
     }
    }

   vm.getUsers = function (tableState) {
       console.debug(tableState);
       tableState = tableState || vm.tableState;
       vm.tableState = tableState;

       if (!tableState.sort.predicate) {
           return;
       }

       page = tableState.pagination.start == 0 ? 0 : parseInt(tableState.pagination.start/tableState.pagination.number, 10);
       var pageSize = tableState.pagination.number;
       sort = tableState.sort.predicate ?
           (tableState.sort.predicate + ',' + (tableState.sort.reverse ? 'DESC' : 'ASC')) : '';

       term = composeTerm(tableState.search.predicateObject);

       userService.get({page: page, size: pageSize, sort: sort, term: !term ? 'deleted==false' : term}, function (data) {
          vm.users = data.content;
          vm.totalElements = data.totalElements;
          vm.totalPages = data.totalPages;
          tableState.pagination.numberOfPages = data.totalPages;
       });

       if (localStorageService.isSupported) {
           localStorageService.set('userListFilter', vm.filters);
       }
   };

   vm.deleteUser = function (user) {
       sweetAlert.swal({
           title: 'Are you sure you want to delete ' + user.username + '?',
           text: 'You will not be able to recover this ' + user.username,
           type: 'warning',
           showCancelButton: true,
           confirmButtonText: 'Yes',
           cancelButtonText: 'No',
           allowOutsideClick: false
       }).then(function (result) {
           if (result.value) {
               merchantProfileService.delete({id: merchant.id}, function () {
                   toastr.success('User deleted Successfully', 'Success');
                   vm.getMerchants();
               }, function (err) {
                   toastr.error('Error deleting user. Please contact your system administrator', 'Error');
               });
           } else if (result.dismiss === 'cancel') {
           }
       });
   };

   function composeTerm(predicateObject) {
     if (!predicateObject) {
       return;
     }
     var term = 'deleted==false';
     for (var i in predicateObject) {
       append(i + '=like="' + predicateObject[i] + '"');
     };

     function append(predicate) {
       if (term.length) {
         term += ';';
       }
       term += predicate;
     }
     return term;
   }

   vm.clearFilter = function() {
       vm.tablePageSize = 10;
       vm.getUsers();
   };

  }
})();

