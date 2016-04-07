var svc = angular.module('AdventureSrvc', ['ngResource']);

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