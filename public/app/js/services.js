var svc = angular.module('AdventureService',[]);

svc.service("InitialService", [function (){
    this.userLocation = "lair";
    this.fin = false;
    this.beenTo = ["lair"];
    this.allItems = {
        "lair": ["map", "cauldron", "Haggis"],
        "giza": ["money", "A grumpy cat", "some schwarma"],
        "alexandria": ["starlight", "a book titled: History of Atlantis", "a Box of Butternut Squash"],
        "vault":  ["dust","a Strange cream filled yellow cake"]
    }
    this.inventory = ["staff"];
    this.localItems = [];
}]);

svc.service("ParsingService", [function (command){
    this.parse = function(command){
        par = command.split(" ");
        comm = par[0].trim();
        // location = par[par.length-1].trim();
        item = par[par.length-1].trim();
        return {
            comm,
            // location,
            item
            
        };
    }
}]);

svc.service("GetWizard", ["$http",function ($http){
   this.wizardDB = function(callback){
        $http({
            method: 'GET',
            url: '/api/wizards'
        }).then(function successCallback(response) {
            console.log(response);
           callback(response);
        }, function errorCallback(response) {
            return response;
        });
    }
}]);

svc.service("UpdateWizard", ["$http",function ($http){
    this.wizardDB = function(theInventory, theLocation, locationHist, finState, theId){
        $http({
        method: 'PUT',
        url: '/api/wizard',
        params: {
            id: theId
        },
        data: {
            inventory: theInventory,
            currentLocation: theLocation,
            locationHistory: locationHist,
            fin: finState
        }
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            
        });
    }
}]);

// svc.service("CreateWizard", [function (theInventory, theLocation, locationHist, finState){
//     $http({
//     method: 'POST',
//     url: '/api/wizard',
//     data: {
//         inventory: theInventory,
//         currentLocation: theLocation,
//         locationHistory: locationHist,
//         fin: finState
//     }
//     }).then(function successCallback(response) {
//         this.wizardDB = response;
//     }, function errorCallback(response) {
        
//     });
// }]);

// svc.service("CreateLocations", [function (aName, someObjects){
//     $http({
//     method: 'POST',
//     url: '/api/location',
//     data: {
//         name: aName,
//         objects: someObjects
//     }
//     }).then(function successCallback(response) {
//         this.locationDB = response;
//     }, function errorCallback(response) {
        
//     });
// }]);

svc.service("GetLocation", ["$http", function ($http){
    this.locationDB = function(callback) {
        $http({
        method: 'GET',
        url: '/api/location'
        }).then(function successCallback(response) {
            callback(response);
        }, function errorCallback(response) {
            
        });
    }
}]);






