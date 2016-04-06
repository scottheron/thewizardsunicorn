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
    // $scope.initialService = InitialService;
    
    CreateWizard(["staff"], "lair", ["lair"], false);
    CreateLocations("lair", ["map", "cauldron", "Haggis"]);
    CreateLocations("giza", ["money", "A grumpy cat", "some schwarma"]);
    CreateLocations("alexandria", ["starlight", "a book titled: History of Atlantis", "a Box of Butternut Squash"]);
    CreateLocations("vault", ["dust","a Strange cream filled yellow cake"]);
    CreateLocations("atlantis", ["Unicorn"]);
    $scope.adjacentLocations = [];
    
    var gameLogic = function (){
        $scope.wizard = GetWizard.wizardDB();
        $scope.parsingService = ParsingService;
        switch($scope.parsingService.comm){
            case 'go':
            if ($scope.wizard.wizardDB.locationHistory.indexOf($scope.parsingService.location) != -1) {
                $scope.output = "Traveling";
                UpdateWizard($scope.wizard.wizardDB.inventory, $scope.parsingService.location, $scope.wizard.wizardDB.locationHistory, $scope.wizard.wizardDB.fin);
            } else {
                if ($scope.parsingService.location == "giza" && $scope.wizard.wizardDB.inventory.indexOf("map") != -1){
                    $scope.wizard.wizardDB.locationHistory.push("giza");
                    UpdateWizard($scope.wizard.wizardDB.inventory, "giza", $scope.wizard.wizardDB.locationHistory, $scope.wizard.wizardDB.fin);
                    
                }
                if ($scope.parsingService.location == 'alexandria' && $scope.wizard.wizardDB.currentLocation == 'harbor' && $scope.wizard.wizardDB.inventory.indexOf("money") != -1) {
                    
                    $scope.wizard.wizardDB.locationHistory.push("alexandria");
                    UpdateWizard($scope.wizard.wizardDB.inventory, "alexandria", $scope.wizard.wizardDB.locationHistory, $scope.wizard.wizardDB.fin);
                    
                }
                if ($scope.parsingService.location == 'harbor' && $scope.wizard.wizardDB.currentLocation == 'giza') {
                    $scope.wizard.wizardDB.locationHistory.push("harbor");
                    UpdateWizard($scope.wizard.wizardDB.inventory, "harbor", $scope.wizard.wizardDB.locationHistory, $scope.wizard.wizardDB.fin);
                }
                if ($scope.parsingService.location == 'vault' && $scope.wizard.wizardDB.currentLocation == 'alexandria') {
                    $scope.wizard.wizardDB.locationHistory.push("vault");
                    UpdateWizard($scope.wizard.wizardDB.inventory, "vault", $scope.wizard.wizardDB.locationHistory, $scope.wizard.wizardDB.fin);
                }
                if ($scope.parsingService.location == 'atlantis' && $scope.wizard.wizardDB.currentLocation == 'vault' && $scope.wizard.wizardDB.inventory.indexOf("starlight") != -1) {
                    $scope.wizard.wizardDB.locationHistory.push("atlantis");
                    UpdateWizard($scope.wizard.wizardDB.inventory, "atlantis", $scope.wizard.wizardDB.locationHistory, true);
                }
                //$scope.output = whatever;
                
            }
            break;
            
            case 'look':
            $scope.allLocations = GetLocation; 
            $scope.output = $scope.allLocations.locationDB.objects;
            break;
            
            case 'pick':
            $scope.wizard.wizardDB.inventory.push($scope.parsingService.item);
            UpdateWizard($scope.wizard.wizardDB.inventory, $scope.wizard.wizardDB.currentLocation, $scope.wizard.wizardDB.locationHistory, $scope.wizard.wizardDB.fin);
            //PickUp($scope.parsingService.item);
            break;
            
            case 'where':
            $scope.adjacentLocations = $scope.wizard.wizardDB.locationHistory.slice(0);
            
            if ($scope.wizard.wizardDB.currentLocation == "lair" && $scope.wizard.wizardDB.locationHistory.indexOf("giza") == -1 && $scope.wizard.wizardDB.inventory.indexOf("map") != -1) {
               $scope.adjacentLocations.push("giza");
            }
            if ($scope.wizard.wizardDB.currentLocation == "giza" && $scope.wizard.wizardDB.locationHistory.indexOf("harbor") == -1) {
               $scope.adjacentLocations.push("harbor");
            }
            if ($scope.wizard.wizardDB.currentLocation == "harbor" && $scope.wizard.wizardDB.locationHistory.indexOf("alexandria") == -1 && $scope.wizard.wizardDB.inventory.indexOf("money") != -1) {
               $scope.adjacentLocations.push("alexandria");
            }
            if ($scope.wizard.wizardDB.currentLocation == "alexandria" && $scope.wizard.wizardDB.locationHistory.indexOf("vault") == -1) {
               $scope.adjacentLocations.push("vault");
            }
            if ($scope.wizard.wizardDB.currentLocation == "vault" && $scope.wizard.wizardDB.inventory.indexOf("starlight") != -1) {
               $scope.adjacentLocations.push("atlantis");
            }
            
            var indexOfLocation = $scope.adjacentLocations.indexOf($scope.wizard.wizardDB.currentLocation);
            
            $scope.adjacentLocations.splice(indexOfLocation, 1);
            
            break;
            
            case 'inventory':
            $scope.output = $scope.wizard.wizardDB.inventory;
            break;
            
            default:
            $scope.output = //something;
        }
        
        $scope.wizard = GetWizard;
        $scope.initialService = InitialService;
    }
}]);