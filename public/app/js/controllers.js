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

ctl.controller('Game', ['$scope', 'GetWizard', 'ParsingService', "GetLocation", "UpdateWizard", function ($scope, GetWizard,ParsingService,GetLocation,UpdateWizard){
    // $scope.initialService = InitialService;
    $scope.output = "default";
    // CreateWizard(["staff"], "lair", ["lair"], false);
    // CreateLocations("lair", ["map", "cauldron", "Haggis"]);
    // CreateLocations("giza", ["money", "A grumpy cat", "some schwarma"]);
    // CreateLocations("alexandria", ["starlight", "a book titled: History of Atlantis", "a Box of Butternut Squash"]);
    // CreateLocations("vault", ["dust","a Strange cream filled yellow cake"]);
    // CreateLocations("atlantis", ["Unicorn"]);
    $scope.adjacentLocations = [];
    $scope.input="";

    $scope.wiz = function(){
        GetWizard.wizardDB($scope.loc);
    };

    $scope.loc = function(wiz){
        $scope.wizard = wiz;
        GetLocation.locationDB($scope.gameLogic);
    }
    
    $scope.gameLogic = function (allTheLocations){

        $scope.allLocations = allTheLocations;
        // $scope.wizard = GetWizard.wizardDB();
        console.log($scope.wizard);
        $scope.parsingService = ParsingService.parse($scope.input);
        console.log($scope.parsingService);
        switch($scope.parsingService.comm) {
            case 'go':
            if ($scope.wizard.wizardDB.locationHistory.indexOf($scope.parsingService.location) != -1) {
                $scope.output = "Traveling";
                UpdateWizard($scope.wizard.wizardDB.inventory, $scope.parsingService.location, $scope.wizard.wizardDB.locationHistory, $scope.wizard.wizardDB.fin);
            } else {
                if ($scope.parsingService.location == "giza" && $scope.wizard.wizardDB.inventory.indexOf("map") != -1){
                    $scope.wizard.wizardDB.locationHistory.push("giza");
                    UpdateWizard($scope.wizard.wizardDB.inventory, "giza", $scope.wizard.wizardDB.locationHistory, $scope.wizard.wizardDB.fin, $scope.wizard.wizardDB._id);
                    
                }
                if ($scope.parsingService.location == 'alexandria' && $scope.wizard.wizardDB.currentLocation == 'harbor' && $scope.wizard.wizardDB.inventory.indexOf("money") != -1) {
                    
                    $scope.wizard.wizardDB.locationHistory.push("alexandria");
                    UpdateWizard($scope.wizard.wizardDB.inventory, "alexandria", $scope.wizard.wizardDB.locationHistory, $scope.wizard.wizardDB.fin, $scope.wizard.wizardDB._id);
                    
                }
                if ($scope.parsingService.location == 'harbor' && $scope.wizard.wizardDB.currentLocation == 'giza') {
                    $scope.wizard.wizardDB.locationHistory.push("harbor");
                    UpdateWizard($scope.wizard.wizardDB.inventory, "harbor", $scope.wizard.wizardDB.locationHistory, $scope.wizard.wizardDB.fin, $scope.wizard.wizardDB._id);
                }
                if ($scope.parsingService.location == 'vault' && $scope.wizard.wizardDB.currentLocation == 'alexandria') {
                    $scope.wizard.wizardDB.locationHistory.push("vault");
                    UpdateWizard($scope.wizard.wizardDB.inventory, "vault", $scope.wizard.wizardDB.locationHistory, $scope.wizard.wizardDB.fin, $scope.wizard.wizardDB._id);
                }
                if ($scope.parsingService.location == 'atlantis' && $scope.wizard.wizardDB.currentLocation == 'vault' && $scope.wizard.wizardDB.inventory.indexOf("starlight") != -1) {
                    $scope.wizard.wizardDB.locationHistory.push("atlantis");
                    UpdateWizard($scope.wizard.wizardDB.inventory, "atlantis", $scope.wizard.wizardDB.locationHistory, true, $scope.wizard.wizardDB._id);
                }
                //$scope.output = whatever;
                
            }
            break;
            
            case 'look':
            // $scope.allLocations = GetLocation; 
            $scope.output = $scope.allLocations.locationDB.objects;
            break;
            
            case 'pick':
            $scope.wizard.wizardDB.inventory.push($scope.parsingService.item);
            UpdateWizard($scope.wizard.wizardDB.inventory, $scope.wizard.wizardDB.currentLocation, $scope.wizard.wizardDB.locationHistory, $scope.wizard.wizardDB.fin, $scope.wizard.wizardDB._id);
            //PickUp($scope.parsingService.item);
            break;
            
            case 'where':
            console.log("entering where");
            $scope.adjacentLocations = $scope.wizard.locationHistory.slice(0);
            
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
            $scope.output = "don't undesrstand";
        }
        
        // $scope.wizard = GetWizard;

        
    }
}]);