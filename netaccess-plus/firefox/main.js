require('fennec-addon-preferences-workaround');
var system = require("sdk/system");
var sPref = require("sdk/simple-prefs");
var authmode = sPref.prefs['authmode'];
var notifications = require("sdk/notifications");

console.log("Platform = " + system.platform);


if (system.platform == "android" && authmode == "N") {
    var pf = require("./mobile.js");
}

else if (system.platform != "android" && authmode == "N") {
    var pf = require("./desktop.js");
}

else if (system.platform == "android" && authmode == "L") {
    var pf = require("./mobile_old.js");
}

else {
    var pf = require("./desktop_old.js");
}



exports.main = function (options, callbacks) {
    console.log(options.loadReason);
    
    if (options.loadReason === 'upgrade' || options.loadReason === 'install' || options.loadReason === 'enable') {
	notifications.notify({
      	    title: "Netaccess Plus",
  	    text: "\nThe add-on now supports the new firewall.\n\nGo to add-on preferences to switch between the authentication modes."
	});
    }
}


//
//
//
// Here I lay down
// A humble egg of Easter
// For my lovely colleagues to discover
//
//
//
//		     ,aaadddd8888888bbbbaaa,_
//		 ,adP"::' 888  "Y8ba,  ```::Y8aa,_
//	   ,dP"  ::' ,88P    ,88P'   ,::: ``8"Yba,
//	  ,88'  ,::  d88'   d8P'     :::'  ,P  `)88a,
//	 ,888   ::'  888   "Y8ba,    :::   d'   d8P`Ya,
//	,888P  ,::  ,88P     ,88P'  ,:::  ,P   ,88'  `Ya,
//	8888'  ::'  d88'    d8P'    :::'  d'   d8P   ,::b,
//	8888   ::   888    "Y8ba,   :::   8    88'   ::::b
//	8888   ::   888      ,88P'  :::   8    88,   ::::P
//	8888,  ::,  Y88,    d8P'    :::,  Y,   Y8b   `::P'
//	`888b  `::  `88b   "Y8ba,   `:::  `b   `88,  ,d"
//	 `888   ::,  888     ,88P'   :::   Y,   Y8b,d"
//	  `88,  `::  Y88,   d8P'     :::,  `b  _)8P"
//	   `Yb,  ::, `88b  "Y8ba,    `::: _,8adP"  
//		 `"Yb,::, 888    ,88P'  __::adP""'     
//		     `"""YYYY8888888PPPP"""'
//
// 
//
// I pray to thee,
// O wise reviewers of Mozilla,
// Forgive the whims of this flighty wight 
// For my code is pure and free of darkness
// 
