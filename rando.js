var sget = require('sget');
//display opening screen?
//game over screen?

var fin = false;
var userLocation = "lair";
var beenTo = ["lair"];
var beenTo2 = {
	"giza": "harbor",
	"alexandria": "vault",
	"vault": "atlantis"
}
var allItems = {
	"lair": ["map", "cauldron", "Haggis"],
	"giza": ["money", "A grumpy cat", "some schwarma"],
	"alexandria": ["starlight", "a book titled: History of Atlantis", "a Box of Butternut Squash"],
	"vault":  ["dust","a Strange cream filled yellow cake"]
}

var localItems = ["test"];
var inventory = ["staff"];

var displayText = function (txt) {
	//write new line to DOM
	console.log(txt);

};

var pickup = function (item) {
	//puts an item into user inventory
	idx = localItems.indexOf(item);
	if (idx != -1){
		inventory.push(item);
		localItems.splice(idx,1);
		//allItems[userLocation].splice(idx,1);
		return item;
	}
	else return false;
};

var getObjRoom = function(room) {
	//returns item array in location
	localItems = allItems[room];
	return localItems
};


//may not need this v
var getAdjLoc = function (curLocation) {
	//gets locations user can go to
	console.log("current location "+ curLocation);
	var canGo = [];
	canGo = beenTo.slice(0);
	if (curLocation=="lair"&&inventory.indexOf("map") != -1 && canGo.indexOf("giza")== -1) canGo.push("giza");
	if (curLocation=="giza" && canGo.indexOf("harbor")== -1)canGo.push("harbor");
	if (curLocation=="harbor" && inventory.indexOf("money") != -1 && canGo.indexOf("alexandria")== -1){
	 //console.log("pushing alexandria"); 
	 canGo.push("alexandria");
	}
	if (curLocation=="alexandria" && canGo.indexOf("vault")== -1) canGo.push("vault");
	if (curLocation =="vault" && inventory.indexOf("starlight") != -1) canGo.push('atlantis');
	idx = canGo.indexOf(curLocation);
	canGo.splice(idx,1);
	return canGo;
};


var processCommand = function(command) {
	console.log("Parsing: "+command)
	var par = command.split(" ");
	comm = par[0].trim();
	var location = par[par.length-1].trim();
	var item = par[par.length-1].trim();
	switch (comm){
		case "goto":
			if (beenTo.indexOf(location) != -1) {
				//localItems = [];
				console.log("You open shimmering portal and step through...");
				userLocation = location;
				
			} else {
		
				if (location == "giza"&& inventory.indexOf("map") != -1) {
					userLocation = "giza";
					beenTo.push("giza");
					console.log("You open a shimmering portal and step through into blistering heat. The air is dry and you immediately lick your lips as the arid wind and sand sears your face.");
					console.log("You set out to find your friend, who has a stall at the market. You pass by merchants selling trinkets, wares, and most importantly food. Your stomach grumbles, but you have a mission. You find your friend at his small stall selling circus trained fleas. His skin his weathered from age, and his white beared is is tangled.");
					console.log("'Hey old man. My dear old mum has been cursed by Ebrietas.' you say");
					console.log("The old man hums and rubs his beard before saying, 'The only thing that can cure her is a unicorn's fart, and the Last Unicorn is in the lost city of Atlantis.'");
					console.log("'Well how do I get to Atlantis?' you ask.");
					console.log("It is said the hidden road to Atlantis is at the Library of Alexandria. There are boats to Alexandria in the harbor.");
					console.log("Thanks old man!");
					console.log("Wait! It's dangerous to go alone. Take this!");
					console.log("He hands you a wooden sword.");
					console.log("You are confused as to why you would need a wooden sword. But you stuff it up your sleeve anyway.");
					inventory.push("wooden sword");
				}
				if (location == "alexandria" && userLocation=="harbor" && inventory.indexOf("money") != -1){
					userLocation = "alexandria";
					beenTo.push("alexandria");
					console.log("You make your way off the boat, the smell of fish on the docks doing little to detract from the splendor of the famous lighthouse that casts a shadow over you. You continue on into the city on your way to the most complete library in the entire world.");
					console.log("The marble steps to the hallowed place of learning bring a silent reverence to you as you enter.");
				}
				if (location == "harbor" && userLocation == "giza"){
					userLocation = "harbor";
					beenTo.push("harbor");
					console.log("You exit the city limits to the docks along the nile. There are many boats, though most are full of fish.");
					console.log("You find a passenger boat who may be willing to take you to Alexandria, if you have the coin.");
				}
				if (location == "vault" && userLocation == "alexandria"){
					userLocation = "vault";
					beenTo.push("vault");
					console.log("You enter the dusty room. It is protected by ancient magic, and you carefuly examine for booby traps.");
					console.log("The only thing of consequence is a large pedestal. It holds a basin covered in carved runes with some mysterious purpose.");
				}
				if (location=="atlantis" && userLocation=="vault" && inventory.indexOf("starlight") != -1){
					userLocation = "atlantis";
					console.log("You pour the starlight from it's sealed bottle into the basin. The silver light seeps like liquid into the runes and a wind begins to pick up. A large portal begins to form in the air, and you step through...");
					console.log("And find yourself in the Lost City of Atlantis.");
					console.log("You marvel at its beauty, until you are almost gored by a Unicorn.");
					console.log("You manuver around the Unicorn until you are able to siphon a rainbow colored fart into your sleeves.");
					console.log("But the Unicorn doesn't stop, and soon you are chased back the way you came.");
					console.log("Atlantis may be inhabited by killer Unicorns, but you have what you came for. Your mother will soon be cured...Or will she?");
					fin = true;
				}
				console.log("you are now in "+userLocation);
			}

			break;
		case "look":
			//print localItems
			getObjRoom(userLocation);
			console.log("You look around for useful, or shiny things. Or food.");
			console.log(localItems);
			break;
		case "pickup":
			//pickup an item
			console.log("you picked up "+pickup(item));
			console.log("You stuff it up the sleeves of your robes");
			
			break;
		case "where": 
			//prints canGo
			console.log("You can go to these places:");
			console.log(getAdjLoc(userLocation));
			// if (userLocation in beenTo2){
			// 	console.log(beenTo2[userLocation]);
			// }

			break;
		case "inventory":
			console.log("You pull some things out of your sleeves including: ");
			console.log(inventory);
			break;

		default:
			console.log("didn't understand");
			
		//case "lookat":

		//case "talkto":

	}


};

var processRound = function(command) {
	//called when submit is pressed and runs whatever



	processCommand(command);

};


console.log("You are a wizard whose mother has fallen ill.");
console.log("She has been cursed with ancient magic, and you don't know how to cure her.");
console.log("But hope is not lost!");
console.log("An old friend who lives in Giza may know a solution...");
while (!fin) {
		console.log("what do you want to do?");
		var com = sget("input");

		processCommand(com);
	}



