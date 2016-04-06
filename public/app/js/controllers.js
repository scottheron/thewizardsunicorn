var ctl = angular.module('AdventureCtrl', ['AdventureService', "AdventureFactory", 'duParallax']);

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

ctl.controller('Game', ['$scope', function ($scope){
    $scope.initialService = InitialService;
    var gameLogic = function (){
        
        $scope.parsingService = ParsingService;
        switch($scope.parsingService.comm){
            case 'go':
            if (BeenToIndex($scope.parsingService.location) != -1) {
                $scope.output = //something;
                SaveCurrentLocation($scope.parsingService.location);
            } else {
                if ($scope.parsingService.location == "giza" && InventoryIndex("map") != -1){
                    SaveCurrentLocation("giza");
                    DBWriteBeenTo("giza");
                }
                if ($scope.parsingService.location == 'alexandria' && $scope.initialService.userLocation == 'harbor' && InventoryIndex("money") != -1) {
                    SaveCurrentLocation("alexandria");
                    DBWriteBeenTo("alexandria");
                }
                if ($scope.parsingService.location == 'harbor' && $scope.initialService.userLocation == 'giza') {
                    SaveCurrentLocation("harbor");
                    DBWriteBeenTo("harbor");
                }
                if ($scope.parsingService.location == 'vault' && $scope.initialService.userLocation == 'alexandria') {
                    SaveCurrentLocation("vault");
                    DBWriteBeenTo("vault");
                }
                if ($scope.parsingService.location == 'atlantis' && $scope.initialService.userLocation == 'vault' && InventoryIndex("starlight") != -1) {
                    //database fin = true
                    DBWriteBeenTo("atlantis");
                }
                //$scope.output = whatever;
                
            }
            break;
            
            case 'look':
            GetLocationItem($scope.initialService.userLocation); 
            break;
            
            case 'pick':
            PickUp($scope.parsingService.item);
            break;
            
            case 'where':
            var adj = GetJSONLocation($scope.initialService.userLocation);
            break;
            
            case 'inventory':
            var inv = Inventory 
            break;
            
            default:
            $scope.output = //something;
        }
        $scope.initialService = InitialService;
    }
}]);