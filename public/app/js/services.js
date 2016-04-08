var svc = angular.module('AdventureService', ['ngResource']);

svc.factory('Adventure', ['$resource', function($resource) {
  return $resource('/api/adventure/:id');
}]);

svc.factory('Auth', ['$window', function($window) {
  return { 
    saveToken: function(token) {
      $window.localStorage['secretadventure-token'] = token; 
    },
    getToken: function() {
      return $window.localStorage['secretadventure-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('secretadventure-token');
    },
    isLoggedIn: function() { 
      var token = this.getToken();
      return token ? true : false;
    }
  };
}]);

svc.factory('AuthInterceptor', ['Auth', function(Auth) {
  return {
    request: function(config) {
      var token = Auth.getToken();
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
}]);

svc.service("ParsingService", [function (command){
    this.parse = function(command){
        var properItems = {
            "go": ["lair", "giza", "harbor", "alexandria", "vault", "atlantis"],
            "pick": ["map", "cauldron", "Haggis", "money", "cat", "schwarma", "starlight", "History", "Squash", "dust", "cake"]
        };
        par = command.split(" ");
        comm = par[0].trim();
        // location = par[par.length-1].trim();
        item = par[par.length-1].trim();
        console.log('comm1 '+comm);
        console.log('item1'+item);
        comm = comm.replace(/["](\w+)["]?\s?/, '$1');
        item = item.replace(/[\W]?(\w+)[\W]?["]?/, '$1');
        if (item == "light") item = 'starlight';
        console.log('comm2 '+comm);
        console.log('item2'+item);

        if (comm in properItems && properItems[comm].indexOf(item) == -1){
            comm = "mcGarble";
        }
        
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
    this.wizardDB = function(theInventory, theLocation, locationHist, finState, theId, callback){
        $http({
        method: 'PUT',
        url: '/api/wizards',
        data: {
            id: theId,
            inventory: theInventory,
            currentLocation: theLocation,
            locationHistory: locationHist,
            fin: finState
        }
        }).then(function successCallback(response) {
            callback(response);
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
        url: '/api/locations'
        }).then(function successCallback(response) {
            callback(response);
        }, function errorCallback(response) {
            
        });
    }
}]);