var ctl = angular.module('AdventureCtrl', ['duParallax']);

ctl.controller('Adventure', ['$scope', '$http', function ($scope, $http) {
    $http.get('/apikey', {}).then(function success(data){
        apikey = data.data;
    }, function error (data) {
        console.log(data);
    });
}]);

ctl.controller('Parallax', function($scope, parallaxHelper){
    $scope.background = parallaxHelper.createAnimator(-0.5, 150, -150);
});
