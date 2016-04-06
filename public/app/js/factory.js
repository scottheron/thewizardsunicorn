var fty = angular.module("AdventureFactory", []);

fty.factory("InventoryIndex", [function (itemName){
    Wizard.inventory.find({item: itemName}, function(err){
        if (err){
            return false;
        } else {
            return true;
        }
    });
}]);

fty.factory("BeenToIndex", [function (location){
    Wizard.locationHistory.find({locationHistory: location}, function(err){
        if (err){
            return false;
        } else {
            return true;
        }
    });
}]);