var data = require("sdk/self").data;
var Request = require("sdk/request").Request;
var Pass = require("sdk/passwords");
var notifications = require("sdk/notifications");

var { setTimeout, setInterval, clearInterval } = require("sdk/timers");


randomAlloc();



// -----------------------------------------------------------------
// -----------------------------------------------------------------
// Defining critical functions
// -----------------------------------------------------------------
// -----------------------------------------------------------------


// Variables for storing preferred credentials
var user, pass;
var loopID;
var unspec=0;
var creds=0;


// -----------------------------------------------------------------
// Function to get the credentials
// -----------------------------------------------------------------

function randomAlloc() {
    console.log("Searching...");
    
    
    Pass.search({
	url: "https://netaccess.iitm.ac.in/",
	onComplete: function onComplete(credentials) {
            credentials.forEach( function(credential) {
		console.log("iterating..");
		user = credential.username;
		pass = credential.password;
		creds++;
		console.log("Iterations finished. creds= "+creds);
		//console.log("Randomly chosen user: "+user+pass);
	    } )
	}
    });
    
    setTimeout( function() { checkUnspec() }, 2000);

}
// Function ends here  


// -----------------------------------------------------------------
// Function to check if any credentials are found
// -----------------------------------------------------------------

function checkUnspec() {
    
    
    if (creds == 0) {
    	Pass.search({
	url: "https://nfw.iitm.ac.in/",
	onComplete: function onComplete(credentials) {
            credentials.forEach( function(credential) {
		console.log("iterating..");
		user = credential.username;
		pass = credential.password;
		creds++;
		console.log("Iterations finished. creds= "+creds);
		//console.log("Randomly chosen user: "+user+pass);
		    } )
		}
    	});
    	setTimeout( function() { console.log("Not found") }, 2000);	
	unspec=1;
	
	notifications.notify({
	    title: "Hi there!",
	    text: "Please store your LDAP password on the new netaccess site to use the add-on. Don't worry, this is a one-time job."
	});
	
	
	//console.log("Setting unspec as 1");
    }
    
    // Done with zero-credential case
    else {
	//console.log("Setting unspec as 0");
	unspec=0;
    }
    
    if (unspec != 1) {
	req1();
    }
}



// -----------------------------------------------------------------
// Function to send login request
// -----------------------------------------------------------------

var magic;
var flag = 0;
function req1 () {
    
    var beg;
    Request({
	url: "https://nfw.iitm.ac.in:1003/login?048bd6c30799653f",
	onComplete: function (response) {
      	    //console.log(response);    
            if (response.text.search("IIT") != -1) {
        	beg = Number(response.text.search("magic"));
        	magic = response.text.substring(beg+14, beg+30);
        	postreq();
            }
            
            else if (response.text.search("Google Inc") != -1) {
    		console.log("Already online.");
            }
            else {
        	notifications.notify({
        	    title: "Offline?",
      		    text: "Please check your internet connection."
    		});
            }
	}
    }).get();
}

var livestring;

function postreq() {    
    
    
    console.log(magic);
    var beg;
    var g = "http://www.google.co.in";
    Request({

	url: "https://nfw.iitm.ac.in:1003/",
	content: {magic : magic, username : user, password : pass, "4Tredir" : g},
	onComplete: function (response) {
	    if (response.text.search("authentication") != -1) {
		beg = response.text.search("/logout?");
		livestring = response.text.substring(beg+8, beg+24);
		console.log("Keep Alive String: "+livestring);
		startTimer();
	    }
	}
    }).post();

}



// -----------------------------------------------------------------
// Function to keep sending keepalive requests
// -----------------------------------------------------------------

function startTimer() {
    
    Request({
	url: "https://nfw.iitm.ac.in:1003/keepalive?"+livestring,
	onComplete: function (response) {

	    console.log("Keepalive request successful");
  	}
    }).get();

    
    
    notifications.notify({
	title: "Netaccess Plus",
	text: "Keepalive process started in the background. Click the button if it doesn't work."
    });

    loopID = setInterval(function() {
	
	// Periodically send a keepalive request
	Request({
	    url: "https://nfw.iitm.ac.in:1003/keepalive?"+livestring,
	    onComplete: function (response) {
		console.log("Keepalive request successful");
	    }
	}).get();
	
    }, 50000);
}


// -----------------------------------------------------------------
// MAIN FUNCTIONS
// -----------------------------------------------------------------


function firstClick() {
    randomAlloc();
}
