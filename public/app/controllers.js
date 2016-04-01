var ctl = angular.module('AdventureCtrl', []);

ctl.controller('Adventure', ['$scope', '$http', function ($scope, $http){
    
    $http.get('/adventure').then(function success(res) {
    }, function error(res) {
        console.log(res);
    });
}]);