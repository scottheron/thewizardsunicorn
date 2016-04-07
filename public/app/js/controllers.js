var ctl = angular.module('AdventureCtrl', ['AdventureService', 'duParallax']);

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

ctl.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success (res) {
      $location.path('/');
    }, function error(res) {
      console.log(res);
    });
  }
}]);

ctl.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);      
      $location.path('/');
    }, function error(res) {
      console.log(res);
    })
  }
}]);

ctl.controller('NavCtrl', ['$scope', 'Auth', '$state', function($scope, Auth, $state) {
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    $state.reload();
  }
}]);

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
    $scope.commands="";
    
    $scope.voiceToText = function() {
        $scope.commands = 'Loading';
        start(function(text) {
            $scope.$apply(function() {
                $scope.commands = text;
                console.log($scope.commands);
            });
        });
    }

    $scope.wiz = function(){
        GetWizard.wizardDB($scope.loc);
    };

    $scope.loc = function(wiz){
        $scope.wizard = wiz;
        GetLocation.locationDB($scope.gameLogic);
    }

    $scope.pickup = function(wiz){
        console.log(wiz);
        $scope.output = "You picked up "+$scope.wizard.data.inventory[$scope.wizard.data.inventory.length-1];
    }

    $scope.newPlace = function(wiz){
        if ($scope.parsingService.item == 'atlantis'){
            $scope.output = "You have won!";
        }
        $scope.output = "You traveled to "+$scope.parsingService.item;
    }
    
    $scope.gameLogic = function (allTheLocations){

        $scope.allLocations = allTheLocations;
        // $scope.wizard = GetWizard.wizardDB();
        console.log("inventory");
        console.log($scope.wizard.data.inventory);
        $scope.parsingService = ParsingService.parse($scope.commands);
        console.log($scope.parsingService);
        switch($scope.parsingService.comm) {
            case 'go':
            if ($scope.wizard.data.locationHistory.indexOf($scope.parsingService.item) != -1) {
                $scope.output = "Traveling";
                UpdateWizard.wizardDB($scope.wizard.data.inventory, $scope.parsingService.item, $scope.wizard.data.locationHistory, $scope.wizard.data.fin,$scope.wizard.data._id, $scope.newPlace);
            } else {
                if ($scope.parsingService.item == "giza" && $scope.wizard.data.inventory.indexOf("map") != -1){
                    $scope.wizard.data.locationHistory.push("giza");
                    UpdateWizard.wizardDB($scope.wizard.data.inventory, "giza", $scope.wizard.data.locationHistory, $scope.wizard.data.fin, $scope.wizard.data._id, $scope.newPlace);
                    
                }
                if ($scope.parsingService.item == 'alexandria' && $scope.wizard.data.currentLocation == 'harbor' && $scope.wizard.data.inventory.indexOf("money") != -1) {
                    
                    $scope.wizard.data.locationHistory.push("alexandria");
                    UpdateWizard.wizardDB($scope.wizard.data.inventory, "alexandria", $scope.wizard.data.locationHistory, $scope.wizard.data.fin, $scope.wizard.data._id, $scope.newPlace);
                    
                }
                if ($scope.parsingService.item == 'harbor' && $scope.wizard.data.currentLocation == 'giza') {
                    $scope.wizard.data.locationHistory.push("harbor");
                    UpdateWizard.wizardDB($scope.wizard.data.inventory, "harbor", $scope.wizard.data.locationHistory, $scope.wizard.data.fin, $scope.wizard.data._id, $scope.newPlace);
                }
                if ($scope.parsingService.item == 'vault' && $scope.wizard.data.currentLocation == 'alexandria') {
                    $scope.wizard.data.locationHistory.push("vault");
                    UpdateWizard.wizardDB($scope.wizard.data.inventory, "vault", $scope.wizard.data.locationHistory, $scope.wizard.data.fin, $scope.wizard.data._id, $scope.newPlace);
                }
                if ($scope.parsingService.item == 'atlantis' && $scope.wizard.data.currentLocation == 'vault' && $scope.wizard.data.inventory.indexOf("starlight") != -1) {
                    $scope.wizard.data.locationHistory.push("atlantis");
                    $scope.wizard.data.fin = true;
                    UpdateWizard.wizardDB($scope.wizard.data.inventory, "atlantis", $scope.wizard.data.locationHistory, true, $scope.wizard.data._id, $scope.newPlace);
                }
                //$scope.output = whatever;
                
            }
            break;
            
            case 'look':
            // $scope.allLocations = GetLocation; 
            console.log("entering look");
            $scope.allLocations.data.forEach(function(location) {
                if (location.name==$scope.wizard.data.currentLocation){
                    $scope.output = location.objects;
                }
            });
            
            break;
            
            case 'pick':
            $scope.wizard.data.inventory.push($scope.parsingService.item);
            console.log($scope.wizard.data.inventory);
            UpdateWizard.wizardDB($scope.wizard.data.inventory, $scope.wizard.data.currentLocation, $scope.wizard.data.locationHistory, $scope.wizard.data.fin, $scope.wizard.data._id, $scope.pickup);
           
            //PickUp($scope.parsingService.item);
            break;
            
            case 'where':
            console.log("entering where");
            console.log($scope.wizard.data.locationHistory);
            $scope.adjacentLocations = $scope.wizard.data.locationHistory.slice(0);
            console.log("adjloc");
            console.log($scope.adjacentLocations);
            console.log($scope.wizard.data.inventory.indexOf("map"));
            
            if ($scope.wizard.data.currentLocation == "lair" && $scope.wizard.data.locationHistory.indexOf("giza") == -1 && $scope.wizard.data.inventory.indexOf("map") != -1) {
               $scope.adjacentLocations.push("giza");
            }
            if ($scope.wizard.data.currentLocation == "giza" && $scope.wizard.data.locationHistory.indexOf("harbor") == -1) {
               $scope.adjacentLocations.push("harbor");
            }
            if ($scope.wizard.data.currentLocation == "harbor" && $scope.wizard.data.locationHistory.indexOf("alexandria") == -1 && $scope.wizard.data.inventory.indexOf("money") != -1) {
               $scope.adjacentLocations.push("alexandria");
            }
            if ($scope.wizard.data.currentLocation == "alexandria" && $scope.wizard.data.locationHistory.indexOf("vault") == -1) {
               $scope.adjacentLocations.push("vault");
            }
            if ($scope.wizard.data.currentLocation == "vault" && $scope.wizard.data.inventory.indexOf("starlight") != -1) {
               $scope.adjacentLocations.push("atlantis");
            }
            
            var indexOfLocation = $scope.adjacentLocations.indexOf($scope.wizard.data.currentLocation);
            
            $scope.adjacentLocations.splice(indexOfLocation, 1);
            $scope.output = $scope.adjacentLocations;
            
            break;
            
            case 'inventory':
            $scope.output = $scope.wizard.data.inventory;
            break;
            
            default:
            $scope.output = "don't undesrstand";
        }
        
        // $scope.wizard = GetWizard;

        
    }
}]);