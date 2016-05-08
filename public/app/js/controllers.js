// Controllers JS file for the wizards unicorn. Creates the AdventureCtrl for the app. Uses duParallax, ngStorage
// and links to the AdventureService.
var ctl = angular.module('AdventureCtrl', ['AdventureService', 'duParallax', 'ngStorage']);

// Adventure controller updates API key.
ctl.controller('Adventure', ['$scope', '$http', function ($scope, $http) {
    $http.get('/apikey', {}).then(function success(data){
        apikey = data.data;
    }, function error (data) {
        console.log(data);
    });
}]);

// Parallax controller handles parallax CSS
ctl.controller('Parallax', function($scope, parallaxHelper){
    $scope.background = parallaxHelper.createAnimator(-0.5, 150, -150);
});

// SignupCtrl handles user signup variables
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

// LoginCtrl controller handles user login variables and auth token data.
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
// NavCtrl controller handles the lohout state.
ctl.controller('NavCtrl', ['$scope', 'Auth', '$state', function($scope, Auth, $state) {
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    $state.reload();
  }
}]);

// Game controller runs the game itself.
ctl.controller('Game', ['$scope', 'GetWizard', 'ParsingService', "GetLocation", "UpdateWizard",'$localStorage', function ($scope, GetWizard,ParsingService,GetLocation,UpdateWizard, $localStorage){
    console.log($localStorage);
    if ($localStorage.message == null){
    $scope.output = "You are a wizard whose mother has fallen ill. She has been cursed with ancient magic, and you don't know how to cure her. But hope is not lost! An old friend who lives in Giza may know a solution...\nwhat do you want to do?";
    } else{
        $scope.output = $localStorage.message;
    }
    $scope.adjacentLocations = [];
    $scope.commands="";

    $scope.resetGame = function() {
        UpdateWizard.wizardDB(["staff"], "lair", ["lair"], false,$scope.wizard.data._id, $scope.reload);

    };

    $scope.reload = function() {
        GetWizard.wizardDB(function(wiz) {
            
                $scope.wizard = wiz;
                console.log($localStorage.message);
                
                $localStorage.message = "You are a wizard whose mother has fallen ill. She has been cursed with ancient magic, and you don't know how to cure her. But hope is not lost! An old friend who lives in Giza may know a solution...\nwhat do you want to do?";
                $scope.output = $localStorage.message;
                console.log($scope.output);
                console.log($localStorage.message);
                location.reload();
            
            
        });
    };
    
    $scope.voiceToText = function() {
        $scope.commands = 'Loading';
        start(function(text) {
            $scope.$apply(function() {
                $scope.commands = text;
                console.log($scope.commands);
            });
        });
    };

    $scope.wiz = function(){
        GetWizard.wizardDB($scope.loc);
    };

    $scope.loc = function(wiz){
        $scope.wizard = wiz;
        GetLocation.locationDB($scope.gameLogic);
    };

    $scope.pickup = function(wiz){
        console.log(wiz);
        $scope.output = "You picked up "+$scope.wizard.data.inventory[$scope.wizard.data.inventory.length-1];
    };

    $scope.newPlace = function(wiz){
        if ($scope.parsingService.item == 'atlantis'){
            $scope.testing = "You have won!";
        }
        // $scope.output = "You traveled to "+$scope.parsingService.item;
    };
    
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
                $scope.output = "You teleport to "+$scope.parsingService.item;
                UpdateWizard.wizardDB($scope.wizard.data.inventory, $scope.parsingService.item, $scope.wizard.data.locationHistory, $scope.wizard.data.fin,$scope.wizard.data._id, $scope.newPlace);
            } else {
                if ($scope.parsingService.item == "giza" && $scope.wizard.data.inventory.indexOf("map") != -1){
                    $scope.wizard.data.locationHistory.push("giza");
                    $scope.output = "You open a shimmering portal and step through into blistering heat. The air is dry and you immediately lick your lips as the arid wind and sand sears your face. \nYou set out to find your friend, who has a stall at the market. You pass by merchants selling trinkets, wares, and most importantly food. Your stomach grumbles, but you have a mission. You find your friend at his small stall selling circus trained fleas. His skin his weathered from age, and his white beared is is tangled.&#13;&#10;'Hey old man. My dear old mum has been cursed by Ebrietas.' you say.\nThe old man hums and rubs his beard before saying, 'The only thing that can cure her is a unicorn's fart, and the Last Unicorn is in the lost city of Atlantis.'\n'Well how do I get to Atlantis?' you ask.\nIt is said the hidden road to Atlantis is at the Library of Alexandria. There are boats to Alexandria in the harbor. \nThanks old man! \nWait! It's dangerous to go alone. Take this! \nHe hands you a wooden sword. You are confused as to why you would need a wooden sword. But you stuff it up your sleeve anyway.";
                    $scope.wizard.data.inventory.push("wooden sword");
                    UpdateWizard.wizardDB($scope.wizard.data.inventory, "giza", $scope.wizard.data.locationHistory, $scope.wizard.data.fin, $scope.wizard.data._id, $scope.newPlace);
                    
                }
                else if ($scope.parsingService.item == 'alexandria' && $scope.wizard.data.currentLocation == 'harbor' && $scope.wizard.data.inventory.indexOf("money") != -1) {
                    
                    $scope.wizard.data.locationHistory.push("alexandria");
                    $scope.output = "You make your way off the boat, the smell of fish on the docks doing little to detract from the splendor of the famous lighthouse that casts a shadow over you. You continue on into the city on your way to the most complete library in the entire world. \nThe marble steps to the hallowed place of learning bring a silent reverence to you as you enter.";
                    UpdateWizard.wizardDB($scope.wizard.data.inventory, "alexandria", $scope.wizard.data.locationHistory, $scope.wizard.data.fin, $scope.wizard.data._id, $scope.newPlace);
                    
                }
                else if ($scope.parsingService.item == 'harbor' && $scope.wizard.data.currentLocation == 'giza') {
                    $scope.wizard.data.locationHistory.push("harbor");
                    $scope.output = "You exit the city limits to the docks along the nile. There are many boats, though most are full of fish. \nYou find a passenger boat who may be willing to take you to Alexandria, if you have the coin.";
                    UpdateWizard.wizardDB($scope.wizard.data.inventory, "harbor", $scope.wizard.data.locationHistory, $scope.wizard.data.fin, $scope.wizard.data._id, $scope.newPlace);
                }
                else if ($scope.parsingService.item == 'vault' && $scope.wizard.data.currentLocation == 'alexandria') {
                    $scope.wizard.data.locationHistory.push("vault");
                    $scope.output = "You enter the dusty room. It is protected by ancient magic, and you carefuly examine for booby traps.\nThe only thing of consequence is a large pedestal. It holds a basin covered in carved runes with some mysterious purpose.";
                    UpdateWizard.wizardDB($scope.wizard.data.inventory, "vault", $scope.wizard.data.locationHistory, $scope.wizard.data.fin, $scope.wizard.data._id, $scope.newPlace);
                }
                else if ($scope.parsingService.item == 'atlantis' && $scope.wizard.data.currentLocation == 'vault' && $scope.wizard.data.inventory.indexOf("starlight") != -1) {
                    $scope.wizard.data.locationHistory.push("atlantis");
                    $scope. output = "You pour the starlight from it's sealed bottle into the basin. The silver light seeps like liquid into the runes and a wind begins to pick up. A large portal begins to form in the air, and you step through...\nAnd find yourself in the Lost City of Atlantis.You marvel at its beauty, until you are almost gored by a Unicorn. \nYou maneuver around the Unicorn until you are able to siphon a rainbow colored fart into your sleeves.But the Unicorn doesn't stop, and soon you are chased back the way you came. \nAtlantis may be inhabited by killer Unicorns, but you have what you came for. Your mother will soon be cured...Or will she?";
                    $scope.wizard.data.fin = true;
                    UpdateWizard.wizardDB($scope.wizard.data.inventory, "atlantis", $scope.wizard.data.locationHistory, true, $scope.wizard.data._id, $scope.newPlace);
                }
                else {
                    $scope.output = "You Can't go there";
                }
                //$scope.output = whatever;
                
            }
            break;
            
            case 'check':
            // $scope.allLocations = GetLocation; 
            console.log("entering look");
            $scope.allLocations.data.forEach(function(location) {
                if (location.name==$scope.wizard.data.currentLocation){
                   
                    $scope.output = location.objects.toString();
                   
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
            $scope.output = $scope.adjacentLocations.toString();
            
            break;
            
            case 'what':
            $scope.output = $scope.wizard.data.inventory.toString();
            break;
            
            default:
            $scope.output = "don't undesrstand";
        }
        
        if ($scope.wizard.data.fin === true) $scope.testing = "You Won!";
        console.log($scope.testing);
        $localStorage.message = $scope.output;
        
    }
}]);