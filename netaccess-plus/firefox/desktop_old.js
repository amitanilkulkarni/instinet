var data = require("sdk/self").data;
var Request = require("sdk/request").Request;
var tabs = require("sdk/tabs");
var Pass = require("sdk/passwords");
var notifications = require("sdk/notifications");
var urls = require("sdk/url");

var { setInterval, clearInterval, setTimeout } = require("sdk/timers");
var sPref = require("sdk/simple-prefs");



// -----------------------------------------------------------------
// Creating the action-button
// -----------------------------------------------------------------
var { ActionButton } = require("sdk/ui/button/action");

var button = ActionButton({
    id: "show-panel",
    label: "Approve",
    icon: "./icon.png",
    onClick: firstClick
});


// -----------------------------------------------------------------
// -----------------------------------------------------------------
// Defining critical functions
// -----------------------------------------------------------------
// -----------------------------------------------------------------


// Variables for storing preferred credentials
var user1, user2, pass1, pass2, user3, pass3, userflag=1;
var wait1=0, wait2=0, wait3=0;
var loopID;
var unspec=0;
var creds=0;

var lookupMtd = sPref.prefs['lookupMtd'];
var link, link1, link2;

var user, pass;


// -----------------------------------------------------------------
// Function to get the preferred credentials
// -----------------------------------------------------------------

function getPrefCred() {

    if (lookupMtd == "IP") {
        link = urls.URL("https://10.24.0.147");
    }
    else if (lookupMtd == "DNS") {
        link = urls.URL("https://netaccess.iitm.ac.in");
    }
    
    link1= urls.URL(link.toString()+"account/login");
    link2= urls.URL(link.toString()+"account/approve");
    creds=0;
    
    console.log(link1.toString());
    
    // Acquiring username preferences
    user1 = sPref.prefs['uName1']; //console.log("user1: "+user1);
    user2 = sPref.prefs['uName2']; //console.log("user2: "+user2);
    user3 = sPref.prefs['uName3']; //console.log("user3: "+user3);
    
    
    // Searching for primary user's password, if it exists
    if (user1 != "") {
	//console.log("user1 not blank: " + user1);
	getUser1();
    }
    else if (user2 != "") {
  	//console.log("user2 not blank: " + user2);
  	getUser2();
    }
    else if (user3 != "")
  	getUser3();
    else
  	randomAlloc();
}

function randomAlloc() {    
    //console.log("No stored creds found!");
    // ANYTHING WORKS!
    Pass.search({

	url: "https://netaccess.iitm.ac.in",
	
	onComplete: function onComplete(credentials) {
            credentials.forEach(function(credential) {
		////console.log("iterating..");
		if (creds == 0) {
		    user1 = credential.username;
		    pass1 = credential.password;
		    creds++;
		}
		else if (creds == 1) {
		    user2 = credential.username;
		    pass2 = credential.password;
		    creds++;
		}
		else {
		    user3 = credential.username;
		    pass3 = credential.password;
		    creds++;
		}         
            });
            //console.log("Iterations finished. creds= "+creds);
            //console.log("Randomly chosen users: "+user1+user2+user3);
            checkUnspec();
	}  
    });    
}
// Function ends here  

function getUser1() {
    Pass.search({

	url: "https://netaccess.iitm.ac.in",
	username: user1,
	
	onComplete: function onComplete(credentials) {
            credentials.forEach(function(credential) {
		user1 = credential.username;
		pass1 = credential.password;
		creds++;
		//console.log(pass1+creds);
		if (user2 != "")
	            getUser2();
		else if (user3 != "")
	      	    getUser3();
		else
	      	    req1();
            });
	}  
    });
}

function getUser2() {
    Pass.search({

	url: "https://netaccess.iitm.ac.in",
	username: user2,
	
	onComplete: function onComplete(credentials) {
            credentials.forEach(function(credential) {
		user2 = credential.username;
		pass2 = credential.password;
		creds++;
		//console.log(pass2+creds);
		if (user3 != "") {
          	    getUser3();
		}
		else
          	    req1();
            });
	}  
    });
}

function getUser3() {
    Pass.search({

	url: "https://netaccess.iitm.ac.in",
	username: user3,
	
	onComplete: function onComplete(credentials) {
            credentials.forEach(function(credential) {
		user3 = credential.username;
		pass3 = credential.password;
		creds++;
		//console.log(pass3+creds);
		
		req1();
            });
	}  
    });
}

// -----------------------------------------------------------------
// Function to check if any credentials are found
// -----------------------------------------------------------------

function checkUnspec() {
    // No passwords stored at all!
    if (creds == 0) {
	//console.log("Setting unspec as 1");
	
	notifications.notify({
	    title: "Hi there! New around here?",
	    text: "Login to the netaccess site, and allow Firefox to remember the password. This is a one-time job."
	});
	
	//console.log("Setting unspec as 1");
	
	unspec=1;
	tabs.open({
	    url: "https://netaccess.iitm.ac.in",
	});

    }
    
    // Done with zero-credential case
    else {
	//console.log("Setting unspec as 0");
	unspec=0;
	button.badgeColor="black";
	button.badge=".";
    }
    
    if (unspec != 1) {
	req1();
    }
}


// -----------------------------------------------------------------
// Function to set current user
// -----------------------------------------------------------------
function userSet() {
    if (userflag == 1) {
	user=user1;
	pass=pass1;
    }
    else if (userflag == 2) {
	user=user2;
	pass=pass2;
    }
    else if (userflag == 3) {
	user=user3;
	pass=pass3;
    }
}



// -----------------------------------------------------------------
// Function to send login request
// -----------------------------------------------------------------
function req1 () {
    
    if (userflag > creds && unspec != 1) {
	
	notifications.notify({
            title: "Oops!",
            text: "All accounts have exceeded their usage limit."
	});
	
	userflag = 1;
	button.disabled = false;
    }
    
    else {
	
	userSet();
	Request({

	    url: link1,
	    content: {userLogin : user, userPassword : pass},
	    onComplete: function (response) {

		// Is anyone home?
		if (response.text.search("Home") == -1) {
		    console.log(response.text);
		    notifications.notify({
			title: "Connection failed",
			text: "Sure you are online?"
		    });
		    button.disabled = false;
		}
		// Online!  
		else {
		    if ( response.text.search("failed") == -1 ) {  
			
			// Login successful!
			if ( response.text.search("approve") != -1 ) {
			    
			    // Approve button exists!
			    button.badge="..";
			    req2();
			}

			else if (response.text.search("exceeded") != -1) {
			    if (creds > 1) {
				
				notifications.notify({
				    title: "One down.",
				    text: "Checking the rest of them..."
				});
				
				userflag++;
              			req1();
			    }
			    else {
              			notifications.notify({
				    title: "Oops!",
				    text: "Your account has exceeded the limit. Too bad it's the only one you have."
				});
				button.disabled = false;
			    }
			}

			else if (response.text.search("10.93.") != -1){
			    notifications.notify({
				title: "Disable hproxy first.",
				text: "Try iProxy: An automatic proxy switcher for insti junta. Click to visit the download page.",
				onClick: function() {
                    		    tabs.open({
      					url: "https://addons.mozilla.org/en-US/firefox/addon/iproxy-for-iit-madras/",
				    });
				}
			    });
			    button.disabled = false;
			}
			
			else {
			    notifications.notify({
				title: "Your IP can't be approved.",
				text: "Try releasing and renewing your IP if you're not using SSH or VPN."
			    });
			    button.disabled = false;
			}
			
			setBadge();
		    }

		    else if (userflag < creds) {
			userflag++;
			req1();
		    }
		    else {
			
			notifications.notify({
			    title: "Invalid login details!",
			    text: "The password you saved on Netaccess site is probably wrong. Please update it."
			});
			button.disabled = false;
		    }
		    
		}
	    }
	}).post();
    }
}


// -----------------------------------------------------------------
// Function to approve the account for the day
// -----------------------------------------------------------------

function req2() {
    Request({
	
	url: link2,
	content: {duration: 2, approveBtn: ""},
	
	onComplete: function (response) {
	    setBadge();
	    
	    notifications.notify({
		title: "Done!",
		text: "Approved for 24 hours."
	    });
            
	    loopID = setInterval(function(){
		setBadge();
	    }, 600000);
	    
	}
	
    }).post();
}


// -----------------------------------------------------------------
// Function to keep updating the usage indicator
// -----------------------------------------------------------------

function setBadge() {
    
    var colrNum, dbegin, dend;
    
    Request({
	
	url: link1,
	content: {userLogin : user, userPassword : pass},
	
	onComplete: function (response) {
	    
	    if (response.text.search("Home") != -1) {
	    	
	    	if(response.text.search("<b>Total download:</b>      0 B<p>") != -1) {
	    	    button.badge="✓";
		    button.badgeColor="green";
	    	}
	    	
	    	else {
	    
			dbegin = response.text.search("<b>Total download:</b> ");
			dend = response.text.search("B<p>");

			if (response.text.substring(dbegin+23, dend).search("K") != -1) {
			    button.badge="0%";
			    button.badgeColor="green";
			    colrNum=0;
			}
			else if (response.text.substring(dbegin+23, dend).search("G") != -1) {
			    button.badge=":(";
			    button.badgeColor="red";
			}
			else {
			    colrNum = Number(response.text.substring(dbegin+23, dend-6));
			    button.badge= response.text.substring(dbegin+23, dend-6) + "%";
			    
			    if (colrNum < 75) {
				button.badgeColor = "green";
			    }
			    else if (colrNum > 75 && colrNum < 90) {
				button.badgeColor = "orange";
			    }
			    else {button.badgeColor = "red";}
			}
		
		}
		
	    }
	    
	}
    }).post();
}


// -----------------------------------------------------------------
// MAIN FUNCTIONS
// -----------------------------------------------------------------


function firstClick() {

    button.disabled = true;    
    getPrefCred();
    clearInterval(loopID);
    setTimeout(enableButton, 10000)
}

function enableButton() {
    button.disabled = false;
}