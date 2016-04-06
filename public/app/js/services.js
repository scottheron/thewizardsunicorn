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

svc.service("DBFindBeenTo", [function (history){
    Wizard.locationHistory.find();
}]);

svc.service("SaveCurrentLocation", [function (location){
    Wizard.update({
        currentLocation: location
    });
}]);

svc.service("DBWriteBeenTo", [function (location) {
    Wizard.update({
        locationHistory: location
    });
}]);

svc.service("Inventory", [function (){
    Wizard.item.find();
}]);

svc.service("InventoryUpdate", [function (anItem){
    Wizard.item.update({
        item: anItem
    });
}]);

svc.service("GameOver", [function (){
    Wizard.update({
        fin: true
    });
}]);

svc.service("GetLocationItem", [function (aLocation){
    Location.item.find({name: aLocation}, function(foundItems){
        this.localItems = foundItems;
    });
}]);

svc.service("PickUp", [function (anItem){
    Wizard.update({
        inventory: [{anItem}]
    });
}]);

svc.service("GetJSONLocation", [function (aLocation){
    //five database calls
}]);




