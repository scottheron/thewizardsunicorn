// Services JS file for the wizards unicorn. Creates the AdventureService for the app.
var svc = angular.module('AdventureService', ['ngResource']);

// factory 'Adventure' returns $resource
svc.factory('Adventure', ['$resource', function($resource) {
  return $resource('/api/adventure/:id');
}]);

// factory 'Auth' deals with site authentication and local storage for that state.
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

// factory 'AuthInterceptor' gets the token for the current user session
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

// service 'ParsingService' takes the text input, removed non letter characters and check for specific words.
svc.service("ParsingService", [function (command){
    this.parse = function(command){
        var properItems = {
            "go": ["lair", "giza", "harbor", "alexandria", "vault", "atlantis"],
            "pick": ["map", "cauldron", "Haggis", "money", "cat", "schwarma", "starlight", "History", "Squash", "dust", "cake"]
        };
        par = command.split(" ");
        comm = par[0].trim();
        item = par[par.length-1].trim();
        // console.log('comm1 '+comm);
        // console.log('item1'+item);
        comm = comm.replace(/["](\w+)["]?\s?/, '$1');
        item = item.replace(/[\W]?(\w+)[\W]?["]?/, '$1');
        if (item == "light") item = 'starlight';
        // console.log('comm2 '+comm);
        // console.log('item2'+item);

        if (comm in properItems && properItems[comm].indexOf(item) == -1){
            comm = "mcGarble";
        }
        
        return {
            comm,
            item
        };
    }
}]);

// service 'GetWizard' gets the current wizard ased on the current user
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

// service 'UpdateWizard' updates the wizards inventory and location
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

// service 'GetLocation' gets the current location of the wizard
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