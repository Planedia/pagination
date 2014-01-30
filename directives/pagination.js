'use strict';

angular.module('planedia', [])
.directive('pagination', function($http) {

  return {
    restrict: 'A',
    scope: true,
    templateUrl: 'template/pagination.html',
    link: function( scope, elem, attrs ) {

      var url = '/sgi/secure/sessions_recharge/execute';
      var typePoint = attrs.type;

      scope.pages = [];
      scope.numberOfTotal = 0;
      scope.currentPage = null;
      scope.source = [];
      scope.pageSize = parseInt(attrs.size, 10);

      $http.get( 'js/data.json' ).success(function(data) {
        
        if(data[typePoint].length > 0) {

          scope.numberOfTotal = data[typePoint].length;

          for(var i = 0; i < Math.ceil( scope.numberOfTotal / scope.pageSize ); i++) {
            scope.pages.push({ 
              source : data[typePoint].slice( i * scope.pageSize,  i * scope.pageSize + scope.pageSize), 
              page : i  
            });
          }

          scope.page = scope.pages[0];
        }
        else {
          // not result
        }
      }).error(function(){
        // error
      });

      scope.changePage = function(i) {
        scope.page = scope.pages[i];
      };
    }
  }

});