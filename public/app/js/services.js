var svc = angular.module('AdventureService');

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
    this.par = command.split(" ");
    this.comm = par[0].trim();
    this.location = par[par.length-1].trim();
    this.item = par[par.length-1].trim();
}]);

svc.service("GetWizard", [function (history){
    $http({
    method: 'GET',
    url: '/api/wizard'
    }).then(function successCallback(response) {
        this.wizardDB = response;
    }, function errorCallback(response) {
        
    });
}]);

svc.service("UpdateWizard", [function (theInventory, theLocation, locationHist, finState){
    $http({
    method: 'PUT',
    url: '/api/wizard',
    params: {
        inventory: theInventory,
        currentLocation: theLocation,
        locationHistory: locationHist,
        fin: finState
    }
    }).then(function successCallback(response) {
        this.wizardDB = response;
    }, function errorCallback(response) {
        
    });
}]);

svc.service("CreateWizard", [function (theInventory, theLocation, locationHist, finState){
    $http({
    method: 'POST',
    url: '/api/wizard',
    params: {
        inventory: theInventory,
        currentLocation: theLocation,
        locationHistory: locationHist,
        fin: finState
    }
    }).then(function successCallback(response) {
        this.wizardDB = response;
    }, function errorCallback(response) {
        
    });
}]);

// svc.service("DBWriteBeenTo", [function (location) {
//     Wizard.update({
//         locationHistory: location
//     });
// }]);

// svc.service("Inventory", [function (){
//     Wizard.item.find();
// }]);

// svc.service("InventoryUpdate", [function (anItem){
//     Wizard.item.update({
//         item: anItem
//     });
// }]);

// svc.service("GameOver", [function (){
//     Wizard.update({
//         fin: true
//     });
// }]);

svc.service("CreateLocations", [function (aName, someObjects){
    $http({
    method: 'POST',
    url: '/api/location',
    params: {
        name: aName,
        objects: someObjects
    }
    }).then(function successCallback(response) {
        this.locationDB = response;
    }, function errorCallback(response) {
        
    });
}]);

svc.service("GetLocation", [function (){
    $http({
    method: 'GET',
    url: '/api/location'
    }).then(function successCallback(response) {
        this.locationDB = response;
    }, function errorCallback(response) {
        
    });
}]);

// svc.service("PickUp", [function (anItem){
//     Wizard.update({
//         inventory: [{anItem}]
//     });
// }]);

svc.service("GetJSONLocation", [function (aLocation){
    //five database calls
}]);




